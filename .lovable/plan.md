

# Direcionar Leads para o Funil "TRAFEGO PAGO" no Kommo

## Resumo
Os leads criados pelo simulador serao enviados para o funil correto no Kommo, na etapa correta, e com a tag solicitada.

## O que sera alterado

### Edge Function `send-to-kommo`
1. **Descobrir os IDs do funil e etapa** -- Antes de alterar o codigo, a funcao precisara consultar a API do Kommo (`GET /api/v4/leads/pipelines`) para identificar:
   - O `pipeline_id` do funil "TRAFEGO PAGO"
   - O `status_id` da etapa "Etapa de leads de Entrada" dentro desse funil

2. **Adicionar `pipeline_id` e `status_id` ao payload do lead** -- O endpoint `/api/v4/leads/complex` aceita esses campos diretamente no corpo da requisicao, garantindo que o lead caia no funil e etapa corretos.

3. **Atualizar a tag** -- Substituir as tags atuais (`Site Simulador` e tipo de bem) por `SIMULADOR MALTA`, conforme solicitado.

### Fluxo tecnico

O payload enviado ao Kommo passara de:
```json
[{
  "name": "Imovel - Joao",
  "tags": [{"name": "Site Simulador"}, {"name": "Imovel"}],
  "_embedded": { "contacts": [...] }
}]
```

Para:
```json
[{
  "name": "Imovel - Joao",
  "pipeline_id": <ID_DO_FUNIL>,
  "status_id": <ID_DA_ETAPA>,
  "tags": [{"name": "SIMULADOR MALTA"}],
  "_embedded": { "contacts": [...] }
}]
```

### Etapas de implementacao

1. Adicionar logica temporaria na edge function para consultar `GET /api/v4/leads/pipelines` e logar todos os funis e etapas disponiveis na conta, para descobrir os IDs corretos
2. Executar a funcao e capturar os IDs nos logs
3. Atualizar o payload do lead com `pipeline_id`, `status_id` e a tag `SIMULADOR MALTA` usando os IDs descobertos
4. Testar criando um lead de teste e verificar no Kommo que ele aparece no funil e etapa corretos

### Nenhuma alteracao no frontend
O `Simulator.tsx` nao precisa ser modificado -- todas as mudancas sao na edge function.

