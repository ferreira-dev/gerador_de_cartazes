---
name: Desenvolvimento de Temas e Layouts
description: Como criar novos temas e layouts seguindo os padrões do projeto
---

# Skill: Desenvolvimento de Temas e Layouts

## Visão Geral

Esta skill orienta a criação de novos temas (ex: Farmácia, Padaria) e layouts (ex: Combo Família, Kit Churrasco) para o gerador de cartazes.

## Conceitos-Chave

- **Tema**: Visual/estilo geral do cartaz (cores, backgrounds, cabeçalhos)
  - Exemplos: Clean, Padrão, Hortifruti, Açougue
  
- **Layout**: Estrutura de precificação dentro de um tema
  - Exemplos: Oferta Destaque, Atacado/Varejo

## Estrutura de Arquivos

```
src/
├── components/templates/
│   └── [tema]/
│       ├── OfertaDestaque.vue
│       └── AtacadoVarejo.vue
├── data/
│   └── theme-layouts.json
└── assets/images/themes/
    ├── fundo_[tema].png
    └── header_[tema].png
```

## Como Criar um Novo Tema

### Passo 1: Criar Pasta e Componentes

```bash
# No host
mkdir src/components/templates/[nome-tema]
```

Criar componentes de layout dentro da pasta (ex: `OfertaDestaque.vue`, `AtacadoVarejo.vue`)

### Passo 2: Configurar em `theme-layouts.json`

```json
{
  "[nome-tema]": {
    "name": "Nome Exibido",
    "description": "Descrição do tema",
    "background": {
      "type": "solid|image",
      "value": "#ffffff|/src/assets/images/themes/fundo_tema.png"
    },
    "header": {
      "type": "image",
      "value": "/src/assets/images/themes/header_tema.png"
    },
    "layouts": {
      "oferta-destaque": {
        "component": "[nome-tema]/OfertaDestaque",
        "name": "Oferta com Destaque",
        "description": "Layout de oferta para [tema]",
        "config": {
          "headerStyle": "solid-yellow|brush-yellow|image",
          "priceStyle": "floating-cents|inline",
          "fontSize": {
            "productName": "12cqw",
            "productDetail": "5cqw",
            "priceInteger": "35cqw",
            "priceDecimal": "12cqw"
          }
        }
      }
    }
  }
}
```

### Passo 3: Registrar Componentes em `PreviewCanvas.vue`

Adicionar importação dinâmica no `componentMap`:

```javascript
const componentMap = {
  'clean/OfertaDestaque': () => import('./templates/clean/OfertaDestaque.vue'),
  '[nome-tema]/OfertaDestaque': () => import('./templates/[nome-tema]/OfertaDestaque.vue'),
  // ...
}
```

### Passo 4: Adicionar Opção em `ThemeSelector.vue`

```javascript
const themeOptions = [
  { name: 'Clean', value: 'clean' },
  { name: 'Nome do Tema', value: '[nome-tema]' },
  // ...
]
```

## Como Criar um Novo Layout

### Passo 1: Criar Componente Vue

Criar `[NomeLayout].vue` nas pastas dos temas que terão esse layout:
- `src/components/templates/clean/[NomeLayout].vue`
- `src/components/templates/padrao/[NomeLayout].vue`
- etc.

### Passo 2: Atualizar `theme-layouts.json`

Adicionar layout dentro de cada tema:

```json
"layouts": {
  "oferta-destaque": { ... },
  "[novo-layout-id]": {
    "component": "[tema]/[NomeLayout]",
    "name": "Nome do Layout",
    "description": "Descrição",
    "config": { ... }
  }
}
```

### Passo 3: Registrar em `PreviewCanvas.vue`

```javascript
const componentMap = {
  'clean/[NomeLayout]': () => import('./templates/clean/[NomeLayout].vue'),
  'padrao/[NomeLayout]': () => import('./templates/padrao/[NomeLayout].vue'),
  // ...
}
```

## Padrões de Desenvolvimento de Componentes

### Props Esperadas

Todo componente de layout recebe:

```javascript
defineProps({
  data: Object,      // posterData do store
  config: Object,    // config do theme-layouts.json
  themeConfig: Object // config do tema
})
```

### Estrutura Básica de Template

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
    <!-- Container com aspect-ratio -->
    <div class="poster-content">
      <!-- Header -->
      <header class="poster-header">
        <h1>{{ data.headerText }}</h1>
      </header>
      
      <!-- Conteúdo principal -->
      <div class="product-info">
        <h2 class="product-name">{{ data.productName }}</h2>
        <p class="product-detail">{{ data.productDetail }}</p>
      </div>
      
      <!-- Preço -->
      <div class="price-display">
        <span class="currency">R$</span>
        <span class="integer">{{ priceParts.integer }}</span>
        <span class="decimal">,{{ priceParts.decimal }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poster-container {
  container-type: inline-size;
  width: 100%;
  height: 100%;
  /* NUNCA usar px para fontes, sempre cqw */
}

.product-name {
  font-size: 12cqw; /* Tamanho relativo ao container */
}

.integer {
  font-size: 35cqw;
}
</style>
```

### Estilização Critical Rules

✅ **SEMPRE**:
- Usar `container-type: inline-size` no elemento raiz
- Usar `cqw` para tamanhos de fonte
- Usar `%` para espaçamentos estruturais
- Usar `scoped` no `<style>`

❌ **NUNCA**:
- Usar `px` para fontes ou margens estruturais
- Usar dimensões fixas que quebram em diferentes tamanhos de papel

### Acessando Configurações

```vue
<script setup>
const props = defineProps(['data', 'config', 'themeConfig'])

// Acessar fontSize do config
const productNameSize = props.config?.fontSize?.productName || '12cqw'

// Acessar background do tema
const bgStyle = computed(() => {
  if (props.themeConfig.background?.type === 'image') {
    return { backgroundImage: `url(${props.themeConfig.background.value})` }
  }
  return { backgroundColor: props.themeConfig.background?.value || '#fff' }
})
</script>
```

## Adicionando Novas Fontes

1. **`index.html`**: Adicionar à URL do Google Fonts
   ```html
   &family=Nome+Da+Fonte
   ```

2. **`src/assets/styles/fonts.css`**: Criar classe CSS
   ```css
   .font-nomedafonte {
     font-family: 'Nome Da Fonte', cursive;
   }
   ```

3. **`src/App.vue`**: Adicionar ao array `fontOptions`
   ```javascript
   { name: 'Nome Da Fonte', value: 'font-nomedafonte' }
   ```

## Campos Dinâmicos no Formulário

Se um layout precisa de campos específicos (ex: Atacado/Varejo precisa de 2 preços), atualizar `ProductForm.vue`:

```vue
<template v-if="store.currentLayoutId === 'atacado-varejo'">
  <FloatLabel>
    <InputNumber 
      id="priceRetail" 
      v-model="store.posterData.priceRetail"
      mode="currency" 
      currency="BRL" 
      locale="pt-BR"
    />
    <label for="priceRetail">Preço Varejo</label>
  </FloatLabel>
</template>
```

## Checklist de Verificação

Ao criar um novo tema/layout:

- [ ] Componentes Vue criados em todas as pastas de tema necessárias
- [ ] Entrada adicionada em `theme-layouts.json`
- [ ] Componentes registrados em `PreviewCanvas.vue` (componentMap)
- [ ] Opção adicionada em `ThemeSelector.vue` (se for tema novo)
- [ ] Campos específicos adicionados em `ProductForm.vue` (se necessário)
- [ ] Imagens de background/header adicionadas em `src/assets/images/themes/` (se aplicável)
- [ ] Testado preview e exportação em diferentes tamanhos de papel (A3, A4, A5)
- [ ] Verificado que fontes escalam corretamente com `cqw`
