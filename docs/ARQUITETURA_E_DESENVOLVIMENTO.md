# Arquitetura e Desenvolvimento - Gerador de Cartazes

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Sistema de Temas e Layouts](#sistema-de-temas-e-layouts)
5. [Guia de Desenvolvimento](#guia-de-desenvolvimento)
6. [Configuração e Ajustes](#configuração-e-ajustes)
7. [Padrões e Boas Práticas](#padrões-e-boas-práticas)

---

## Visão Geral

Este é um **SaaS para geração de cartazes de precificação** voltado para diversos segmentos comerciais (farmácias, hortifrútis, açougues, padarias, etc.). O sistema permite:

- ✅ Criar cartazes personalizados com diferentes temas e layouts
- ✅ Pré-visualizar em tempo real
- ✅ Exportar em alta qualidade (PNG/PDF/Impressão)
- ✅ Suporte a múltiplos tamanhos de papel (A3, A4, A5)

---

## Stack Tecnológico

- **Core**: Vue 3 (Composition API com `<script setup>`)
- **Build**: Vite
- **UI**: PrimeVue 4 (tema Aura, Styled Mode) + TailwindCSS
- **Ícones**: PrimeIcons (exclusivamente)
- **Estado**: Pinia
- **Exportação**: html-to-image + jsPDF
- **Container**: Docker + docker-compose

---

## Arquitetura do Sistema

### 1. Gerenciamento de Estado (Pinia Store)

O **`posterStore.js`** é a fonte única da verdade. Armazena:

- **Tema atual** (`posterTheme`): clean, padrao, hortifruti, acougue
- **Layout atual** (`currentLayoutId`): oferta-destaque, atacado-varejo
- **Dados do cartaz** (`posterData`): preço, nome do produto, detalhes, fonte
- **Configurações** (`paperSize`, `orientation`, `zoomLevel`)

#### Getters Principais:
```javascript
// Retorna configuração completa do tema
currentThemeConfig

// Lista de layouts disponíveis para o tema atual
availableLayouts

// Configuração do layout selecionado
currentLayoutConfig

// Caminho do componente Vue a ser renderizado
currentComponentPath
```

### 2. Estrutura de Diretórios

```text
src/
├── components/templates/
│   ├── clean/
│   │   ├── OfertaDestaque.vue
│   │   └── AtacadoVarejo.vue
│   ├── padrao/
│   │   ├── OfertaDestaque.vue
│   │   └── AtacadoVarejo.vue
│   ├── hortifruti/
│   │   ├── OfertaDestaque.vue
│   │   └── AtacadoVarejo.vue
│   ├── acougue/
│   │   ├── OfertaDestaque.vue
│   │   └── AtacadoVarejo.vue
│   └── shared/  (componentes compartilhados no futuro)
│
├── data/
│   └── theme-layouts.json  (CONFIGURAÇÃO CENTRAL)
│
├── assets/images/themes/
│   ├── fundo_[tema].png
│   └── header_[tema].png
│
└── stores/
    └── posterStore.js
```

### 3. Renderização e Preview

**Componente Orquestrador**: `PreviewCanvas.vue`
- Cria container responsivo (`#poster-canvas`) com aspect-ratio dinâmico
- Usa `<component :is="...">` para renderizar layout dinamicamente
- Passa dados via props para o componente do template

**Componentes de Template**:
- Utilizam **CSS Container Queries** (`container-type: inline-size`)
- Tamanhos de fonte em `cqw` (Container Query Width)
- Garantem layout idêntico em qualquer resolução (preview/exportação)

### 4. Sistema de Exportação

**Composable**: `useExport.js`

#### Processo de Exportação:

1. **Clonagem** (`prepareCaptureElement`):
   - Clona `#poster-canvas` para evitar capturar barras de rolagem
   - Posiciona clone invisível com largura real do papel (210mm para A4)

2. **Rasterização** (html-to-image):
   - Usa SVG foreignObject para renderização fiel
   - Aplica pixelRatio para alta resolução (300 DPI)
   - Gera imagem (Blob/DataURL) a partir do DOM

3. **Geração Final**:
   - **PNG**: canvas → Base64 → download
   - **PDF**: canvas → JPEG → jsPDF → download
   - **Impressão**: canvas → PNG → nova janela → window.print()

### 5. Componentes Principais

| Componente | Responsabilidade |
|-----------|------------------|
| `App.vue` | Layout principal, conecta sidebar com preview |
| `posterStore.js` | Gerenciamento de estado global |
| `PreviewCanvas.vue` | Orquestrador visual, renderiza layout dinâmico |
| `TemplateGallery.vue` | Seletor de layouts (filtrado por tema atual) |
| `ThemeSelector.vue` | Seletor de temas |
| `ProductForm.vue` | Formulário de dados do produto |
| `useExport.js` | Lógica de exportação PNG/PDF/Impressão |

### 6. Fluxo de Trabalho Típico

1. Usuário seleciona **Tema** → Store atualiza `posterTheme`
2. Usuário seleciona **Layout** → Store atualiza `currentLayoutId`
3. Usuário preenche **Formulário** → Store atualiza `posterData`
4. **PreviewCanvas** reage às mudanças e renderiza componente correto
5. Usuário clica em **Exportar** → `useExport` processa e gera arquivo

---

## Sistema de Temas e Layouts

### Arquivo Central: `theme-layouts.json`

Este arquivo é o **"cérebro" da aplicação**. Define:
- Quais layouts cada tema possui
- Configurações específicas de estilo para cada par tema+layout
- Tamanhos de fonte, estilos de header, backgrounds, etc.

### Estrutura Hierárquica

```
Tema (ex: "clean")
└── Layouts (ex: "oferta-destaque", "atacado-varejo")
    └── Configuração (fontSize, styles, component path)
```

### Estrutura do JSON

```json
{
  "clean": {
    "name": "Clean",
    "description": "Tema minimalista e clean",
    "background": {
      "type": "solid",
      "value": "#ffffff"
    },
    "layouts": {
      "oferta-destaque": {
        "component": "clean/OfertaDestaque",
        "name": "Oferta com Destaque",
        "description": "Layout de oferta para tema clean",
        "config": {
          "headerStyle": "solid-yellow",
          "priceStyle": "floating-cents",
          "fontSize": {
            "productName": "12cqw",
            "productDetail": "5cqw",
            "priceCurrency": "12cqw",
            "priceInteger": "35cqw",
            "priceDecimal": "12cqw"
          }
        }
      },
      "atacado-varejo": {
        "component": "clean/AtacadoVarejo",
        "name": "Atacado/Varejo",
        "description": "Dois preços: atacado e varejo",
        "config": {
          "fontSize": {
            "productName": "10cqw",
            "priceInteger": "25cqw",
            "priceDecimal": "10cqw"
          }
        }
      }
    }
  }
}
```

### Conceitos-Chave

- **Tema**: Visual/estilo geral do cartaz (cores, backgrounds, cabeçalhos)
  - Exemplos: Clean, Padrão, Hortifruti, Açougue
  
- **Layout**: Estrutura de precificação dentro de um tema
  - Exemplos: Oferta Destaque, Atacado/Varejo

**Vantagens desta Arquitetura:**
- ✅ **Layouts Independentes**: Cada layout pode ter tamanhos de fonte diferentes dentro do mesmo tema
- ✅ **Sem Condicionais**: Cada tema tem seus próprios componentes, eliminando lógica condicional complexa
- ✅ **Escalável**: Adicionar novos temas/layouts é simples e não afeta código existente
- ✅ **Manutenível**: Alterações em um tema não impactam outros

---

## Guia de Desenvolvimento

### Como Criar um Novo Tema

#### Passo 1: Criar Pasta e Componentes

```bash
# No host (fora do container)
mkdir src/components/templates/[nome-tema]
```

Criar componentes de layout dentro da pasta:
- `OfertaDestaque.vue`
- `AtacadoVarejo.vue`
- (outros layouts conforme necessário)

#### Passo 2: Configurar em `theme-layouts.json`

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

#### Passo 3: Registrar Componentes em `PreviewCanvas.vue`

Adicionar importação dinâmica no `componentMap`:

```javascript
const componentMap = {
  'clean/OfertaDestaque': () => import('./templates/clean/OfertaDestaque.vue'),
  '[nome-tema]/OfertaDestaque': () => import('./templates/[nome-tema]/OfertaDestaque.vue'),
  '[nome-tema]/AtacadoVarejo': () => import('./templates/[nome-tema]/AtacadoVarejo.vue'),
  // ...
}
```

#### Passo 4: Adicionar Opção em `ThemeSelector.vue`

```javascript
const themeOptions = [
  { name: 'Clean', value: 'clean' },
  { name: 'Nome do Tema', value: '[nome-tema]' },
  // ...
]
```

### Como Criar um Novo Layout

#### Passo 1: Criar Componente Vue

Criar `[NomeLayout].vue` nas pastas dos temas que terão esse layout:
- `src/components/templates/clean/[NomeLayout].vue`
- `src/components/templates/padrao/[NomeLayout].vue`
- etc.

#### Passo 2: Atualizar `theme-layouts.json`

Adicionar layout dentro de cada tema:

```json
"layouts": {
  "oferta-destaque": { ... },
  "[novo-layout-id]": {
    "component": "[tema]/[NomeLayout]",
    "name": "Nome do Layout",
    "description": "Descrição",
    "config": {
      "fontSize": { ... }
    }
  }
}
```

#### Passo 3: Registrar em `PreviewCanvas.vue`

```javascript
const componentMap = {
  'clean/[NomeLayout]': () => import('./templates/clean/[NomeLayout].vue'),
  'padrao/[NomeLayout]': () => import('./templates/padrao/[NomeLayout].vue'),
  // ...
}
```

### Estrutura Básica de um Componente de Layout

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,      // posterData do store
  config: Object,    // config do theme-layouts.json
  themeConfig: Object // config do tema
})

const priceParts = computed(() => {
  const parts = props.data.price.toFixed(2).split('.')
  return { integer: parts[0], decimal: parts[1] }
})

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

<template>
  <div class="poster-container" :class="data.font">
    <div class="poster-content">
      <!-- Header -->
      <header class="poster-header">
        <h1>{{ data.headerText }}</h1>
      </header>
      
      <!-- Conteúdo principal -->
      <div class="product-info">
        <h2 class="product-name" :style="{ fontSize: config.fontSize.productName }">
          {{ data.productName }}
        </h2>
        <p class="product-detail" :style="{ fontSize: config.fontSize.productDetail }">
          {{ data.productDetail }}
        </p>
      </div>
      
      <!-- Preço -->
      <div class="price-display">
        <span class="currency" :style="{ fontSize: config.fontSize.priceCurrency }">R$</span>
        <span class="integer" :style="{ fontSize: config.fontSize.priceInteger }">
          {{ priceParts.integer }}
        </span>
        <span class="decimal" :style="{ fontSize: config.fontSize.priceDecimal }">
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
  /* NUNCA usar px para fontes, sempre cqw */
}

/* Evite definir font-size fixo no CSS, use a config via :style */
</style>
```

### Campos Dinâmicos no Formulário

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
  
  <FloatLabel>
    <InputNumber 
      id="priceWholesale" 
      v-model="store.posterData.priceWholesale"
      mode="currency" 
      currency="BRL" 
      locale="pt-BR"
    />
    <label for="priceWholesale">Preço Atacado</label>
  </FloatLabel>
</template>
```

### Adicionando Novas Fontes

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

---

## Configuração e Ajustes

### 📍 Como Ajustar Tamanhos de Fonte

Os tamanhos de fonte são controlados centralmente no arquivo **`src/data/theme-layouts.json`**.

Cada **layout** dentro de um tema tem sua própria configuração de fontes.

#### Localização no JSON:

```json
{
    "nome-do-tema": {
        "layouts": {
            "nome-do-layout": {
                "config": {
                    "fontSize": {
                        "productName": "18cqw",      // Nome do produto
                        "productDetail": "7cqw",     // Detalhes (marca/tipo)
                        "priceCurrency": "18cqw",    // Símbolo monetário (R$)
                        "priceInteger": "50cqw",     // Preço (inteiro)
                        "priceDecimal": "18cqw"      // Centavos
                    }
                }
            }
        }
    }
}
```

#### Passo a Passo para Ajustar:

1. Abra `src/data/theme-layouts.json`
2. Localize o **tema** desejado (ex: `padrao`)
3. Localize o **layout** desejado (ex: `oferta-destaque`)
4. Dentro de `config` > `fontSize`, ajuste os valores:

   - **Nome do produto maior?** → Aumente `productName` (ex: de 18cqw para 20cqw)
   - **Preço maior?** → Aumente `priceInteger` (ex: de 50cqw para 55cqw)
   - **R$ maior?** → Aumente `priceCurrency` (ex: de 18cqw para 20cqw)

#### Exemplo de Ajuste:

```json
"padrao": {
    "layouts": {
        "oferta-destaque": {
            "config": {
                "fontSize": {
                    "productName": "20cqw",      // ⬆️ Aumentado
                    "productDetail": "8cqw",
                    "priceCurrency": "20cqw",    // ⬆️ Aumentado
                    "priceInteger": "55cqw",     // ⬆️ Aumentado
                    "priceDecimal": "20cqw"
                }
            }
        }
    }
}
```

#### 📐 Unidade `cqw` (Container Query Width)

- `cqw` = Container Query Width (percentual da largura do container)
- **1cqw** = 1% da largura do cartaz
- Valores maiores = texto maior
- **Vantagem**: Escala automaticamente para qualquer tamanho de papel (A3, A4, A5)

#### ⚠️ Importante

- **Layouts Independentes**: Você pode ter fontes grandes no "Oferta Destaque" e fontes pequenas no "Atacado/Varejo" dentro do mesmo tema
- **Preview Automático**: O preview atualiza automaticamente ao salvar o arquivo

---

## Padrões e Boas Práticas

### Estilização de Templates

✅ **SEMPRE**:
- Usar `container-type: inline-size` no elemento raiz do componente
- Usar `cqw` para tamanhos de fonte
- Usar `%` para espaçamentos estruturais
- Usar `scoped` no `<style>`
- Passar tamanhos de fonte via props (`config.fontSize`)

❌ **NUNCA**:
- Usar `px` para fontes ou margens estruturais
- Usar dimensões fixas que quebram em diferentes tamanhos de papel
- Definir font-size fixo no CSS (sempre usar a config do JSON)

**Motivo**: Garante que exportação High-DPI funcione corretamente e que o layout seja idêntico em preview e impressão.

### Reatividade (Vue 3)

✅ **SEMPRE**:
- Usar `const` com `ref()` para reatividade
- Usar `<script setup>` (nunca Options API)

❌ **NUNCA**:
- Usar `reactive()` para primitivos

### Nomenclatura

- Pode ser **PT-BR** ou **EN**, mas manter **consistência por escopo**
- Se um módulo começa em PT, tudo relacionado deve ser em PT
- Se começa em EN, manter em EN

### PrimeVue 4

- Sempre usar componentes nativos do PrimeVue (Button, InputText, etc.)
- **Nunca** usar elementos HTML puros para inputs/botões quando há alternativa PrimeVue
- Usar **PrimeIcons** exclusivamente (nunca FontAwesome, Heroicons, etc.)
- Consultar `primevue4-guide.txt` ao criar/modificar componentes

### Docker e Comandos

- **Criação de arquivos/pastas**: no host (fora do container)
- **Comandos npm**: dentro do container
  ```bash
  docker compose exec app sh
  npm run dev
  ```

---

## Checklist de Verificação

Ao criar um novo tema/layout:

- [ ] Componentes Vue criados em todas as pastas de tema necessárias
- [ ] Entrada adicionada em `theme-layouts.json` com todas as configurações
- [ ] Componentes registrados em `PreviewCanvas.vue` (componentMap)
- [ ] Opção adicionada em `ThemeSelector.vue` (se for tema novo)
- [ ] Campos específicos adicionados em `ProductForm.vue` (se necessário)
- [ ] Imagens de background/header adicionadas em `src/assets/images/themes/` (se aplicável)
- [ ] Testado preview em tempo real
- [ ] Testado exportação PNG em diferentes tamanhos (A3, A4, A5)
- [ ] Testado exportação PDF
- [ ] Testado impressão
- [ ] Verificado que fontes escalam corretamente com `cqw`
- [ ] Verificado que o layout não "quebra" em diferentes orientações (retrato/paisagem)

---

## Resolução de Problemas Comuns

### Problema: Texto cortado na exportação

**Causa**: Uso de `px` ou tamanhos absolutos

**Solução**: Substituir por `cqw` no `theme-layouts.json` e usar `container-type: inline-size`

### Problema: Tamanhos diferentes entre preview e exportação

**Causa**: Definição de font-size no CSS ao invés do JSON

**Solução**: Sempre usar `config.fontSize` passado via props e aplicar com `:style`

### Problema: Layout não aparece ao selecionar tema

**Causa**: Componente não registrado no `componentMap`

**Solução**: Adicionar importação dinâmica em `PreviewCanvas.vue`

### Problema: Campos do formulário não aparecem para layout específico

**Causa**: Condicional ausente em `ProductForm.vue`

**Solução**: Adicionar `v-if="store.currentLayoutId === 'seu-layout'"`
