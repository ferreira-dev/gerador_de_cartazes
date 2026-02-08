# Walkthrough: Refatoração da Arquitetura de Temas e Layouts

## Resumo das Alterações

Foi implementada uma nova arquitetura que permite **vincular layouts específicos a cada tema**, tornando o sistema muito mais escalável, organizado e fácil de manter. Agora, cada tema possui sua própria pasta e seus próprios componentes de layout, eliminando condicionais complexas dentro de um único arquivo.

---

## Nova Estrutura de Diretórios

```text
src/components/templates/
├── clean/
│   ├── OfertaDestaque.vue
│   └── AtacadoVarejo.vue
├── padrao/
│   ├── OfertaDestaque.vue
│   └── AtacadoVarejo.vue
├── hortifruti/
│   ├── OfertaDestaque.vue
│   └── AtacadoVarejo.vue
├── acougue/
│   ├── OfertaDestaque.vue
│   └── AtacadoVarejo.vue
└── shared/  (para componentes compartilhados no futuro)

src/data/
├── theme-layouts.json  (NOVO - configuração central de toda a lógica)
├── templates.json      (legado - pode ser removido)
└── themes.json         (legado - pode ser removido)
```

---

## Arquivos Modificados

| Arquivo | Descrição da Mudança |
|---------|---------|
| `posterStore.js` | Refatorado para ler o `theme-layouts.json`. Agora gerencia a troca de tema e layout de forma vinculada. |
| `PreviewCanvas.vue` | Agora carrega os componentes de forma dinâmica usando um mapa de imports, injetando as configurações de tema e layout como props. |
| `TemplateGallery.vue` | Atualizado para exibir dinamicamente apenas os layouts disponíveis para o tema selecionado no momento. |
| `ThemeSelector.vue` | Ajustado para notificar o Store corretamente sobre a mudança de tema, disparando o reset de layouts se necessário. |
| `ProductForm.vue` | Referências atualizadas de `currentTemplateId` para `currentLayoutId`. |

---

## Novo Arquivo de Configuração: `theme-layouts.json`

Este arquivo é agora o "cérebro" da aplicação. Ele define quais layouts cada tema possui e quais as configurações específicas (tamanhos de fonte, estilos de header, etc.) para aquele par tema+layout.

```json
{
  "clean": {
    "name": "Clean",
    "background": { "type": "solid", "value": "#ffffff" },
    "layouts": {
      "oferta-destaque": {
        "component": "clean/OfertaDestaque",
        "config": {
          "fontSize": {
            "productName": "12cqw",
            "priceInteger": "35cqw"
          }
        }
      }
    }
  }
}
```

---

## Como Criar Novos Itens

### 1. Como Adicionar um Novo Tema (ex: "Peixaria")
1. Crie a pasta `src/components/templates/peixaria/`.
2. Crie os layouts necessários (ex: `OfertaDestaque.vue`) dentro dessa pasta.
3. Adicione a entrada "peixaria" no `theme-layouts.json` definindo seus layouts.
4. Registre os novos caminhos dos componentes no `componentMap` dentro do `PreviewCanvas.vue`.
5. Adicione a opção "Peixaria" no array `themeOptions` do `ThemeSelector.vue`.

### 2. Como Adicionar um Novo Layout (ex: "Combo Família")
1. Crie o componente `ComboFamilia.vue` dentro das pastas dos temas que terão esse layout.
2. Adicione a chave `combo-familia` dentro do objeto `layouts` de cada tema no `theme-layouts.json`.
3. Registre o novo componente no `componentMap` do `PreviewCanvas.vue`.

---

## Validação da Refatoração

- ✅ **Compilação**: Aplicação rodando sem erros no Vite.
- ✅ **Estrutura**: 8 novos componentes criados e organizados por pastas.
- ✅ **Dinamismo**: O seletor de modelos agora se adapta automaticamente ao tema escolhido.
- ✅ **Manutenibilidade**: Se você precisar mudar o tamanho da fonte apenas no tema Clean, você altera apenas no JSON ou no componente do Clean, sem afetar os outros.
