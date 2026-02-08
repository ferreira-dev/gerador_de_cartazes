---
name: Desenvolvimento de Temas e Layouts
description: Como criar novos temas e layouts seguindo os padrões do projeto
---

# Skill: Desenvolvimento de Temas e Layouts

## 📖 Documentação Completa

Para instruções detalhadas sobre desenvolvimento de temas e layouts, consulte:

**`docs/ARQUITETURA_E_DESENVOLVIMENTO.md`**

Este documento contém:
- Passo a passo completo para criar novos temas
- Passo a passo completo para criar novos layouts
- Estrutura básica de componentes
- Configuração de fontes e estilos
- Exemplos de código
- Checklist de verificação

## Guia Rápido de Referência

### Criar Novo Tema: Checklist Resumido

```bash
# 1. Criar pasta no host
mkdir src/components/templates/[nome-tema]

# 2. Criar componentes (ex: OfertaDestaque.vue, AtacadoVarejo.vue)

# 3. Adicionar entrada em src/data/theme-layouts.json

# 4. Registrar em PreviewCanvas.vue (componentMap)

# 5. Adicionar em ThemeSelector.vue (themeOptions)
```

### Criar Novo Layout: Checklist Resumido

```bash
# 1. Criar componente [NomeLayout].vue em cada pasta de tema

# 2. Adicionar no objeto "layouts" de cada tema em theme-layouts.json

# 3. Registrar em PreviewCanvas.vue (componentMap)

# 4. Se precisar campos específicos, atualizar ProductForm.vue
```

### Template Mínimo de Componente

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,
  config: Object,
  themeConfig: Object
})

const priceParts = computed(() => {
  const parts = props.data.price.toFixed(2).split('.')
  return { integer: parts[0], decimal: parts[1] }
})
</script>

<template>
  <div class="poster-container" :class="data.font">
    <div class="poster-content">
      <header class="poster-header">
        <h1>{{ data.headerText }}</h1>
      </header>
      
      <div class="product-info">
        <h2 :style="{ fontSize: config.fontSize.productName }">
          {{ data.productName }}
        </h2>
      </div>
      
      <div class="price-display">
        <span :style="{ fontSize: config.fontSize.priceCurrency }">R$</span>
        <span :style="{ fontSize: config.fontSize.priceInteger }">
          {{ priceParts.integer }}
        </span>
        <span :style="{ fontSize: config.fontSize.priceDecimal }">
          ,{{ priceParts.decimal }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poster-container {
  container-type: inline-size;
  width: 100%;
  height: 100%;
}
</style>
```

### Estrutura de Entrada no theme-layouts.json

```json
{
  "[tema-id]": {
    "name": "Nome Exibido",
    "description": "Descrição",
    "background": {
      "type": "solid|image",
      "value": "#ffffff|/caminho/imagem.png"
    },
    "layouts": {
      "[layout-id]": {
        "component": "[tema-id]/[NomeComponente]",
        "name": "Nome do Layout",
        "description": "Descrição do layout",
        "config": {
          "fontSize": {
            "productName": "12cqw",
            "productDetail": "5cqw",
            "priceCurrency": "12cqw",
            "priceInteger": "35cqw",
            "priceDecimal": "12cqw"
          }
        }
      }
    }
  }
}
```

### Regras Críticas (Nunca Esquecer)

✅ **SEMPRE**:
- `container-type: inline-size` no elemento raiz
- Tamanhos de fonte em `cqw` (via `config.fontSize`)
- Aplicar fontes com `:style` (nunca CSS fixo)
- Usar `<script setup>` e `ref()`

❌ **NUNCA**:
- Usar `px` para fontes ou estrutura
- Definir `font-size` fixo no CSS
- Esquecer de registrar em `PreviewCanvas.vue`
- Usar Options API ou `reactive()` para primitivos

### Como Ajustar Fontes Rapidamente

Abra `src/data/theme-layouts.json` e localize:

```json
"[tema]": {
  "layouts": {
    "[layout]": {
      "config": {
        "fontSize": {
          "productName": "18cqw",     // ⬆️ Aumentar aqui
          "priceInteger": "50cqw"     // ⬆️ Aumentar aqui
        }
      }
    }
  }
}
```

**Unidade `cqw`**: 1% da largura do container
- Aumentar valor = texto maior
- Diminuir valor = texto menor
- Escala automaticamente para todos os tamanhos de papel

### Arquivos a Modificar para Novo Tema/Layout

| Ação | Arquivo | O que fazer |
|------|---------|-------------|
| Criar componente | `src/components/templates/[tema]/[Layout].vue` | Criar arquivo Vue |
| Configurar tema/layout | `src/data/theme-layouts.json` | Adicionar entrada JSON |
| Registrar componente | `src/components/PreviewCanvas.vue` | Adicionar ao `componentMap` |
| Adicionar opção de tema | `src/components/ThemeSelector.vue` | Adicionar ao `themeOptions` |
| Campos específicos (se necessário) | `src/components/ProductForm.vue` | Adicionar `v-if` condicional |
| Imagens (se necessário) | `src/assets/images/themes/` | Adicionar arquivos .png |

### Verificação Final

Antes de considerar completo:

- [ ] Preview renderiza corretamente
- [ ] Exportação PNG funciona (A3, A4, A5)
- [ ] Exportação PDF funciona
- [ ] Impressão funciona
- [ ] Fontes escalam proporcionalmente
- [ ] Não há console errors
- [ ] Layout não quebra em orientações diferentes

