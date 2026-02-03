
# Plano: Atualizar Logo e Cores do Cabeçalho e Rodapé

## Resumo
Vou substituir a logo atual "CréditoFácil" pela logo "Malta Consórcios" que você enviou, e alterar a cor de fundo do cabeçalho e rodapé para o laranja #f85741.

## Alterações Necessárias

### 1. Copiar a Logo para o Projeto
- Copiar a imagem enviada (`Design_sem_nome_15.png`) para a pasta `src/assets/` com o nome `malta-logo.png`

### 2. Atualizar o Cabeçalho (Header.tsx)
- Importar a nova logo como módulo ES6
- Substituir o círculo com a letra "C" e o texto "CréditoFácil" pela imagem da logo
- Alterar a cor de fundo de `bg-background` para um laranja customizado (#f85741)
- Ajustar as cores do texto do menu para ficarem legíveis no fundo laranja (texto branco)
- Ajustar o menu mobile também

### 3. Atualizar o Rodapé (Footer.tsx)
- Importar a nova logo
- Substituir o círculo com a letra "C" e o texto "CréditoFácil" pela imagem da logo
- Alterar a cor de fundo de `bg-primary` para o laranja (#f85741)
- Atualizar o texto do copyright para "Malta Consórcios"

### 4. Adicionar Nova Variável de Cor (index.css)
- Adicionar uma nova variável CSS `--header-footer` com o valor HSL do laranja #f85741 (aproximadamente `6 93% 62%`)

---

## Detalhes Técnicos

### Conversão de Cor
- **HEX**: #f85741
- **HSL**: 6 93% 62%

### Arquivos que Serão Modificados
1. `src/assets/malta-logo.png` (novo arquivo - cópia da logo)
2. `src/components/Header.tsx` - nova logo e cor de fundo laranja
3. `src/components/Footer.tsx` - nova logo e cor de fundo laranja
4. `src/index.css` - nova variável de cor para o laranja

### Estrutura da Logo no Header
```text
Antes: [Círculo azul com "C"] + "CréditoFácil"
Depois: [Imagem da logo Malta Consórcios]
```

### Estrutura da Logo no Footer
```text
Antes: [Círculo branco com "C"] + "CréditoFácil"
Depois: [Imagem da logo Malta Consórcios com fundo claro ou versão branca]
```
