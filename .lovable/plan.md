
Objetivo
- Identificar por que o lead chega no Make/planilha mas “não aparece” no Kommo, e deixar o fluxo com confirmação (e prova) de entrega no Kommo, incluindo o funil TRÁFEGO PAGO + etapa “Etapa de leads de entrada” + tag “SIMULADOR MALTA”.

O que já dá para concluir com certeza (com base nos logs do Preview)
- No Preview, a chamada para a função do backend “send-to-kommo” está acontecendo e retornou HTTP 200 com um lead_id (ex.: 34497290).
- A função já está configurada para usar:
  - pipeline_id = 12050999 (TRÁFEGO PAGO)
  - status_id = 92979627 (“Etapa de leads de entrada”)
  - tag = “SIMULADOR MALTA”
- Existe um erro antigo nos logs (“cannot read replace”) quando a função foi chamada com um payload de debug (action=list_pipelines). Isso não afeta o envio normal do simulador, mas vamos “blindar” para não quebrar com payload inesperado.

Hipótese mais provável do seu “não chegou”
1) Você não publicou as mudanças do frontend ainda (você confirmou isso).
   - Isso significa: os leads reais do site publicado continuam indo só para o Make (porque o código publicado ainda não chama o Kommo).
   - Mesmo no Preview, você pode estar “não encontrando” o lead no Kommo por filtro/visão/automação interna do Kommo; então vamos adicionar uma confirmação objetiva (link/ID retornado) para você localizar em 10 segundos.

O que vamos implementar para parar só quando der para provar que está funcionando

A) Tornar a entrega “auditável” e fácil de localizar no Kommo
1) Backend (send-to-kommo): gerar um “protocolo” (trace_id) por envio
   - Ex.: crypto.randomUUID() ou um ID curto derivado.
   - Incluir esse trace_id:
     - No nome do lead (ou no noteText) para busca rápida no Kommo.
     - Nos logs do backend.
     - No retorno da API para o frontend.
2) Backend: após criar o lead, fazer uma segunda chamada de verificação
   - GET /api/v4/leads/{leadId}
   - Validar no retorno que:
     - pipeline_id == 12050999
     - status_id == 92979627
     - tags contêm “SIMULADOR MALTA” (ou ao menos que a tag foi associada; se a API não retornar tags nesse endpoint, validamos pelo menos pipeline/status e mantemos tag no payload).
   - Se a verificação falhar, a função devolve erro (HTTP 500) com mensagem clara (“Lead criado mas não ficou no funil/etapa esperados” ou “Falha ao validar lead”).
   - Isso nos dá certeza operacional: quando retornar success, está no funil/etapa certos.
3) Backend: retornar para o frontend um objeto bem explícito
   - { success: true, leadId, traceId, pipelineId, statusId, tag: "SIMULADOR MALTA", leadUrl }
   - leadUrl será montada com o domínio do Kommo para você clicar e abrir direto no lead (isso elimina qualquer dúvida de “não achei”).

B) Corrigir fragilidades que podem causar falhas silenciosas
4) Backend: validação de payload (evitar erros do tipo “whatsapp undefined”)
   - Antes de usar whatsapp.replace, checar se whatsapp é string e não está vazio.
   - Se faltar algo essencial (fullName, whatsapp, propertyType, city…), retornar 400 (Bad Request) com detalhes do que faltou.
   - Isso impede que qualquer chamada “estranha” (ex.: payload incompleto) gere 500 confuso.
5) Backend: CORS mais completo (preventivo)
   - Adicionar:
     - Access-Control-Allow-Methods: GET, POST, OPTIONS
     - Access-Control-Max-Age: 86400
   - Garantir que headers CORS estejam presentes também nas respostas de erro.
6) Backend: retries curtos para instabilidade momentânea
   - Implementar 2–3 tentativas (com backoff curto, ex.: 300ms, 900ms) ao chamar:
     - POST /leads/complex
     - POST /leads/{id}/notes
     - GET /leads/{id} (verificação)
   - Se notes falhar, não deve invalidar a criação do lead (retornar success, mas com um campo noteAdded: false e logar o erro).

C) Tornar visível no frontend quando Kommo falhar (hoje pode falhar “sem você notar”)
7) Frontend (Simulator.tsx): tratar o resultado do invoke de forma “determinística”
   - Hoje você usa Promise.allSettled e não bloqueia o fluxo se Kommo falhar. Vamos ajustar para:
     - Se Make OK e Kommo OK: segue normal.
     - Se Make OK e Kommo FAIL: ainda pode redirecionar para /obrigado (para não perder lead), mas:
       - Mostrar um toast de alerta antes de redirecionar (“Enviado para planilha, mas falhou no CRM. Vamos tentar novamente…”)
       - E armazenar em sessionStorage o traceId/erro para exibir na página /obrigado.
     - Alternativa (se você preferir máxima garantia): bloquear o redirecionamento até Kommo confirmar. Eu vou te dar as duas opções e implementamos a que você escolher (recomendação: não bloquear para não aumentar abandono).
8) Frontend (ThankYou.tsx): modo “comprovante”
   - Se existir sessionStorage com leadId/traceId/leadUrl:
     - Mostrar “Protocolo: …” + botão “Abrir no Kommo” (apenas para você confirmar; pode ficar discreto ou condicionado por um parâmetro ?debug=1).
   - Assim você consegue provar em 1 clique se o lead existe e em qual funil/etapa ficou.

D) Publicar para que funcione no site real
9) Publicação
   - Explicar e executar o passo final:
     - Backend já “sobe sozinho”, mas o seu site publicado só vai chamar o Kommo depois que você clicar em Publish/Update.
   - Depois de publicar:
     - Fazer 1 teste real no link publicado e confirmar no Kommo usando o link/ID retornado.

Arquivos que serão alterados
- supabase/functions/send-to-kommo/index.ts
  - Payload validation
  - trace_id
  - retries
  - verificação GET do lead
  - retorno estruturado com leadUrl
  - CORS allow-methods/max-age
- src/components/Simulator.tsx
  - tratamento de sucesso/erro do Kommo com toast + persistência de comprovante (sessionStorage)
- src/pages/ThankYou.tsx (opcional, mas recomendado)
  - exibir protocolo/btn “Abrir no Kommo” (modo debug ou discreto)

Critérios de aceite (como vamos “ter certeza”)
1) No Preview:
   - Ao finalizar simulação, aparece confirmação com:
     - leadId e/ou traceId
     - botão/link para abrir diretamente o lead no Kommo
   - Ao abrir o link, o lead está no funil TRÁFEGO PAGO, etapa “Etapa de leads de entrada”, com tag “SIMULADOR MALTA”.
2) Após publicar:
   - Repetir o teste no site publicado e confirmar o mesmo comportamento.
3) Se o Kommo falhar:
   - O usuário ainda chega em /obrigado (se mantivermos não-bloqueante)
   - Você fica com o “comprovante” do erro (traceId) para diagnóstico e reprocesso manual, sem ficar no escuro.

Observação importante (contexto do seu relato)
- Como você ainda não publicou as mudanças, os leads reais que você vê chegando na planilha (Make) via site publicado não vão para o Kommo até publicar. O plano acima resolve:
  - “Prova” no Preview (link/ID)
  - Publicação para produção
  - Diagnóstico claro se algo falhar

Riscos/limitações (transparência)
- Nenhuma integração com API externa consegue “garantia absoluta” contra indisponibilidade do Kommo, mas com:
  - retries + verificação pós-criação + comprovante (leadUrl/traceId)
  você terá certeza quando deu certo e evidência quando der errado, além de reduzir falhas transitórias.
