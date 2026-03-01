---
name: Arquitetura do Gerador de Cartazes
description: Entendimento da arquitetura e fluxo de dados do sistema de geração de cartazes
---

# Skill: Arquitetura do Sistema

## 📖 Documentação Completa

Para informações detalhadas sobre arquitetura, desenvolvimento e configuração, consulte:

**`docs/ARQUITETURA_E_DESENVOLVIMENTO.md`**

## Resumo Executivo

Este é um **SaaS para geração de cartazes de precificação** voltado para diversos segmentos comerciais.

### Stack Principal
- Vue 3 (Composition API com `<script setup>`)
- PrimeVue 4 (tema Aura, Styled Mode)
- Pinia (gerenciamento de estado)
- html-to-image + jsPDF (exportação)
- Docker + docker-compose

### Arquitetura em Poucas Palavras

```
posterStore.js (estado global)
    ↓
theme-layouts.json (configuração central)
    ↓
PreviewCanvas.vue (orquestrador)
    ↓
Componentes de Template (clean/, padrao/, etc.)
    ↓
useExport.js (PNG/PDF/Impressão)
```

### Fluxo Básico

1. Usuário seleciona **Tema** e **Layout**
2. Preenche **Formulário** de dados do produto
3. **Preview** renderiza em tempo real usando Container Queries (`cqw`)
4. **Exportação** clona o DOM e gera imagem em alta resolução

### Arquivos Mais Importantes

| Arquivo | Função |
|---------|--------|
| `src/stores/posterStore.js` | Estado global (tema, layout, dados) |
| `src/data/theme-layouts.json` | Configuração de temas e estilos |
| `src/components/PreviewCanvas.vue` | Renderização dinâmica de layouts |
| `src/composables/useExport.js` | Exportação PNG/PDF/Impressão |
| `src/components/templates/[tema]/` | Componentes de cada tema |

### Regras Críticas

✅ **SEMPRE**:
- Usar `cqw` para tamanhos de fonte (nunca `px`)
- Usar `container-type: inline-size` nos templates
- Usar `<script setup>` e `ref()`
- Manter consistência de idioma por escopo
- **Manter imagens referenciadas por string (JSON/CSS dinâmico) em `public/images/`** com path iniciando em `/images/...`

❌ **NUNCA**:
- Usar pixels fixos em componentes de template
- Usar Options API ou `reactive()` para primitivos
- Misturar PT-BR e EN no mesmo módulo
- **Referenciar imagens por string com path `/src/assets/...`** — o Vite não rastreia essas referências no build de produção, causando 404 na Vercel

### Assets Estáticos (Imagens)

O projeto usa **dois locais distintos** para assets, com regras bem definidas:

| Local | Quando usar | Exemplo de path |
|-------|-------------|------------------|
| `public/images/` | Imagens referenciadas **por string** em JSON, CSS dinâmico ou URLs montadas em runtime | `/images/themes/header_hortifruti.png` |
| `src/assets/` | Imagens importadas **diretamente** via `import` em componentes `.vue` ou `.js` | `import logo from '@/assets/logo.png'` |

> **Regra de ouro:** Se o path da imagem está como string em `theme-layouts.json` ou em qualquer dado dinâmico, ela **obrigatoriamente** deve estar em `public/`. O Vite só processa e inclui no bundle de produção os arquivos que consegue rastrear via `import` estático.

### Docker

```bash
# Comandos npm devem ser executados DENTRO do container
docker compose exec app sh
npm run dev
```
