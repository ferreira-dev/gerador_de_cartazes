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

❌ **NUNCA**:
- Usar pixels fixos em componentes de template
- Usar Options API ou `reactive()` para primitivos
- Misturar PT-BR e EN no mesmo módulo

### Docker

```bash
# Comandos npm devem ser executados DENTRO do container
docker compose exec app sh
npm run dev
```
