

# Plano: Corrigir Corte das Imagens no Carrossel

## Problema Identificado
Atualmente, as imagens estão usando `object-cover` que centraliza a imagem verticalmente, cortando tanto a parte de cima quanto a parte de baixo. Isso resulta nos rostos dos clientes sendo cortados.

## Solução
Adicionar a classe `object-top` junto com `object-cover`. Isso fará com que:
- A imagem sempre mantenha a parte de cima visível
- O corte aconteça apenas na parte de baixo quando necessário
- Os rostos dos clientes nunca sejam cortados

## Alteração Necessária

### Arquivo: `src/components/TestimonialsSection.tsx`

**Linha 121 - Antes:**
```
className="w-full h-64 md:h-80 object-cover transition-transform duration-300 hover:scale-105"
```

**Depois:**
```
className="w-full h-64 md:h-80 object-cover object-top transition-transform duration-300 hover:scale-105"
```

## Como Funciona

- `object-cover`: Redimensiona a imagem para cobrir todo o container, mantendo a proporção
- `object-top`: Posiciona a imagem a partir do topo, garantindo que a parte superior nunca seja cortada

## Resultado Esperado
Todas as imagens dos clientes mostrarão a parte de cima (rostos, cabeças) intacta, e qualquer corte necessário para ajustar ao tamanho do container será feito apenas na parte inferior da imagem.

