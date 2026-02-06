---
name: Arquitetura do Gerador de Cartazes
description: Entendimento da arquitetura e fluxo de dados do sistema de geração de cartazes
---

# Skill: Arquitetura do Sistema

## Visão Geral do Projeto

Este é um **SaaS para geração de cartazes de precificação** voltado para diversos segmentos comerciais (farmácias, hortifrútis, açougues, padarias, etc.). O sistema permite criar cartazes personalizados com diferentes temas e layouts, pré-visualizar em tempo real e exportar em alta qualidade (PNG/PDF/Impressão).

## Stack Tecnológico

- **Core**: Vue 3 (Composition API com `<script setup>`)
- **Build**: Vite
- **UI**: PrimeVue 4 (tema Aura, Styled Mode) + TailwindCSS
- **Estado**: Pinia
- **Exportação**: html2canvas + jsPDF
- **Container**: Docker + docker-compose

## Arquitetura e Fluxo de Dados

### 1. Gerenciamento de Estado (Pinia Store)

O **`posterStore.js`** é a fonte única da verdade. Armazena:
- Tema atual (`posterTheme`): clean, padrao, hortifruti, acougue
- Layout atual (`currentLayoutId`): oferta-destaque, atacado-varejo
- Dados do cartaz (`posterData`): preço, nome do produto, detalhes, fonte
- Configurações (`paperSize`, `orientation`, `zoomLevel`)

#### Getters Principais:
- `currentThemeConfig`: Retorna configuração completa do tema
- `availableLayouts`: Lista de layouts disponíveis para o tema atual
- `currentLayoutConfig`: Configuração do layout selecionado
- `currentComponentPath`: Caminho do componente Vue a ser renderizado

### 2. Sistema de Temas e Layouts

**Arquivo Central**: `src/data/theme-layouts.json`

Estrutura hierárquica:
```
Tema (ex: "clean")
└── Layouts (ex: "oferta-destaque", "atacado-varejo")
    └── Configuração (fontSize, styles, component path)
```

**Estrutura de Pastas**:
```
src/components/templates/
├── clean/
│   ├── OfertaDestaque.vue
│   └── AtacadoVarejo.vue
├── padrao/
├── hortifruti/
├── acougue/
└── shared/ (componentes compartilhados)
```

Cada tema tem seus próprios componentes de layout, eliminando condicionais complexas.

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

2. **Rasterização** (html2canvas):
   - Aplica scale 3x ou 4x para alta resolução (300 DPI)
   - Converte DOM em canvas

3. **Geração Final**:
   - **PNG**: canvas → Base64 → download
   - **PDF**: canvas → JPEG → jsPDF → download
   - **Impressão**: canvas → PNG → nova janela → window.print()

## Componentes Principais

| Componente | Responsabilidade |
|-----------|------------------|
| `App.vue` | Layout principal, conecta sidebar com preview |
| `posterStore.js` | Gerenciamento de estado global |
| `PreviewCanvas.vue` | Orquestrador visual, renderiza layout dinâmico |
| `TemplateGallery.vue` | Seletor de layouts (filtrado por tema atual) |
| `ThemeSelector.vue` | Seletor de temas |
| `ProductForm.vue` | Formulário de dados do produto |
| `useExport.js` | Lógica de exportação PNG/PDF/Impressão |

## Padrões Críticos

### Estilização de Templates:
- ✅ Usar unidades relativas ao container (`cqw`, `%`)
- ❌ NUNCA usar pixels fixos (`px`) para estrutura/fonte
- Garante que exportação High-DPI funcione corretamente

### Reatividade (Vue 3):
- ✅ Sempre `const` com `ref()`
- ❌ Evitar `reactive()` para primitivos

### Nomenclatura:
- Pode ser PT-BR ou EN, mas manter consistência por escopo
- Se um módulo começa em PT, tudo relacionado deve ser em PT

## Fluxo de Trabalho Típico

1. Usuário seleciona **Tema** → Store atualiza `posterTheme`
2. Usuário seleciona **Layout** → Store atualiza `currentLayoutId`
3. Usuário preenche **Formulário** → Store atualiza `posterData`
4. **PreviewCanvas** reage às mudanças e renderiza componente correto
5. Usuário clica em **Exportar** → `useExport` processa e gera arquivo

## Docker e Comandos

- Criação de arquivos/pastas: no host
- Comandos npm: dentro do container
  ```bash
  docker compose exec app sh
  npm run dev
  ```
