
# Integrar Formulario com o CRM Kommo

## O que sera feito
Alem de enviar os dados do lead para o Make (que ja funciona), o formulario tambem enviara os dados para o CRM Kommo, criando automaticamente um lead com contato vinculado.

## Etapas

### 1. Ativar o Lovable Cloud
O projeto precisa de um backend (edge function) para enviar os dados ao Kommo de forma segura, sem expor as credenciais no navegador do usuario.

### 2. Armazenar credenciais como segredos
As chaves do Kommo (token e secret key) serao armazenadas de forma segura como secrets do projeto, acessiveis apenas pela edge function no servidor.

### 3. Criar Edge Function "send-to-kommo"
Uma funcao no servidor que:
- Recebe os dados do lead do formulario
- Envia para a API do Kommo (`api-g.kommo.com/api/v4/leads/complex`)
- Cria um lead com contato vinculado contendo: nome, WhatsApp, tipo de bem, valores e cidade

### 4. Atualizar o Formulario
Modificar a funcao `handleFinish` no `Simulator.tsx` para:
- Enviar para o Make (como ja faz)
- Enviar tambem para a edge function do Kommo
- Ambos os envios acontecem em paralelo
- O redirecionamento para "/obrigado" so acontece se pelo menos o Make for bem-sucedido (o Kommo nao bloqueia o fluxo)

## Detalhes Tecnicos

### Edge Function: `supabase/functions/send-to-kommo/index.ts`
- Metodo POST recebendo os dados do lead
- Usa o endpoint `POST https://api-g.kommo.com/api/v4/leads/complex` com Bearer token
- Cria lead com nome baseado no tipo de bem + nome do contato
- Vincula contato com nome e telefone (WhatsApp)
- Adiciona notas/tags com informacoes adicionais (valor, entrada, parcela, cidade)
- Inclui headers CORS para permitir chamadas do frontend

### Alteracao no `src/components/Simulator.tsx`
- Adicionar chamada paralela para a edge function do Kommo dentro do `handleFinish`
- Usar `Promise.allSettled` para que falha no Kommo nao impeca o envio ao Make

### Secrets necessarios
- `KOMMO_ACCESS_TOKEN`: o token longo fornecido
- `KOMMO_API_DOMAIN`: `api-g.kommo.com`

### Configuracao em `supabase/config.toml`
- Desabilitar verificacao JWT para a funcao (validacao sera feita internamente)
