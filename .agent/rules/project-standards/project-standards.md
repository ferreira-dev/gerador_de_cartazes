---
trigger: always_on
---

# Project Standards: Vue 3 + PrimeVue 4 (Aura)

Este documento define as diretrizes obrigatórias para o desenvolvimento, comunicação e comportamento do agente neste projeto.

## 0. Regras Gerais
- Nunca em hipótese alguma rode um "rm -rf" ou qualquer tipo de ação que exclua arquivos ou pastas sem minha permissão, principalmente arquivos não versionados.
- o projeto está dockerizado com docker compose, logo comandos gerais de criação de arquivos e diretórios podem ser no terminal do host
porém comandos de npm devem ser feitos dentro do conteiner após acessá-lo: "docker compose exec app sh"

## 1. Idioma e Comunicação
- **Planejamento e Tarefas:** Todas as criações de tasks, checklists e documentos de planejamento devem ser redigidos em **Português (PT-BR)**.
- **Interação no Chat:** Todas as respostas, explicações e diálogos no chat devem ser feitos obrigatoriamente em **Português (PT-BR)**.

## 2. Padrões de Código e Nomenclatura
- **Consistência de Escopo:** Nomes de classes, funções, variáveis e arquivos podem ser em **Inglês ou Português**, desde que a consistência seja mantida. 
    - *Regra de Ouro:* Se uma entidade ou módulo começar em um idioma, todas as suas propriedades e métodos relacionados devem seguir o mesmo idioma.
- **Vue 3 Syntax:** - Utilize estritamente a sintaxe **`<script setup>`**. O uso de Options API é proibido.
    - Para reatividade, prefira sempre o uso de `const` com `ref()`. Evite `reactive()`, especialmente para tipos primitivos ou quando a consistência com o padrão `ref` for necessária.

## 3. UI Framework (PrimeVue 4)
- Sempre se atente a estrutura de pastas atual e mantenha a consistência e a semântica ao criar componentes ou diretórios novos.
- **Documentação Auxiliar:** Sempre consulte o arquivo de apoio em `primevue4-guide.txt` ao criar ou modificar componentes. Ele contém dicas específicas que devem ser seguidas.
- **Modo de Estilização:** O projeto utiliza o **Styled Mode** do PrimeVue 4.
- **Tema:** O tema configurado é o **Aura**. Ao sugerir customizações ou componentes, leve em conta as variáveis e a estética nativa do tema Aura.
- **Ícones:** Use exclusivamente a biblioteca **PrimeIcons**. É terminantemente proibido importar ou sugerir o uso de FontAwesome, Heroicons ou qualquer outra biblioteca de ícones externa.

## 4. Restrições Técnicas
- **Tipagem:** Não utilize TypeScript nesse projeto.
- **Componentes PrimeVue:** Sempre utilize os componentes nativos do PrimeVue em vez de criar elementos HTML puros para inputs, botões e containers, garantindo a fidelidade ao tema Aura.