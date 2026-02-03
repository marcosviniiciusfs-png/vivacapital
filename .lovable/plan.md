
# Plano: Atualizar Webhook URL do Formulário

## Resumo
Vou atualizar a URL do webhook no componente `Simulator.tsx` para o novo endereço fornecido. A estrutura JSON já está implementada corretamente e corresponde ao formato solicitado.

## Alteração

### Arquivo: `src/components/Simulator.tsx`

**Linha 94 - Alterar URL do webhook:**
```typescript
// De:
const webhookUrl = "https://hook.us1.make.com/oot99hzy5i0ycokb712jr592sxv4b2pt";

// Para:
const webhookUrl = "https://hook.us1.make.com/m60b3l3wcknirc4fc7ezy3553yso5jih";
```

## Estrutura JSON Atual (já implementada corretamente)

O código atual já envia os dados no formato JSON correto:

```json
{
  "Data de Entrada": "2026-02-03",
  "Nome Completo": "João Silva",
  "WhatsApp": "(81) 99999-9999",
  "Tipo de Bem": "Imóvel",
  "Valor Pretendido (R$)": "R$ 300.000,00",
  "Valor de Entrada (R$)": "R$ 50.000,00" ou "Não tem",
  "Parcela Ideal (R$)": "R$ 2.500,00",
  "Cidade": "Recife"
}
```

## Mapeamento dos Campos do Formulário

| Campo no JSON | Campo no Formulário |
|---------------|---------------------|
| Data de Entrada | Data atual (gerada automaticamente) |
| Nome Completo | Nome completo |
| WhatsApp | WhatsApp para contato |
| Tipo de Bem | Qual tipo de bem você deseja adquirir? |
| Valor Pretendido (R$) | Qual o valor do crédito que deseja simular? |
| Valor de Entrada (R$) | Tem valor de entrada? (valor ou "Não tem") |
| Parcela Ideal (R$) | Qual a parcela mensal ideal pra você? |
| Cidade | Qual cidade você reside? |

## Quando o Envio Acontece

O request é enviado quando o usuário clica no botão "Finalizar Simulação" após preencher todos os campos obrigatórios.
