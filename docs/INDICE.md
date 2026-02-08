# 📚 Índice da Documentação do Projeto

## Documentação Ativa

### 📐 [ARQUITETURA_E_DESENVOLVIMENTO.md](./ARQUITETURA_E_DESENVOLVIMENTO.md)
**Documento principal do projeto** - Contém toda a informação sobre:
- Visão geral e stack tecnológico
- Arquitetura completa do sistema
- Sistema de temas e layouts
- Guias de desenvolvimento (criar temas/layouts)
- Configuração e ajustes de fontes/estilos
- Padrões e boas práticas
- Checklist de verificação
- Resolução de problemas comuns

**👉 Este é o documento que você deve consultar para 90% das suas dúvidas!**

---

### 🔐 [AUTENTICACAO.md](./AUTENTICACAO.md)
Documentação completa do sistema de autenticação:
- Arquitetura de autenticação
- Fluxo de login/logout
- Estrutura de componentes
- Configuração do Firebase
- Gerenciamento de estado de autenticação

### 🔐 [AUTENTICACAO_README.md](./AUTENTICACAO_README.md)
Guia rápido de referência sobre autenticação (resumo do AUTENTICACAO.md)

---

## 📦 Arquivo Histórico

### [arquivo/](./arquivo/)
Documentos antigos que foram consolidados no `ARQUITETURA_E_DESENVOLVIMENTO.md`:
- `GUIA_AJUSTE_FONTES.md` (arquivado)
- `refatoracao-temas-layouts.md` (arquivado)

⚠️ Estes arquivos são mantidos apenas para referência histórica.

---

## 🎯 Guia Rápido: O Que Consultar?

| Preciso fazer... | Consultar |
|------------------|-----------|
| Entender a arquitetura do sistema | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Arquitetura do Sistema" |
| Criar um novo tema | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Como Criar um Novo Tema" |
| Criar um novo layout | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Como Criar um Novo Layout" |
| Ajustar tamanhos de fonte | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Como Ajustar Tamanhos de Fonte" |
| Entender o sistema de exportação | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Sistema de Exportação" |
| Adicionar autenticação | `AUTENTICACAO.md` |
| Resolver bug de export/preview | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Resolução de Problemas Comuns" |
| Verificar padrões de código | `ARQUITETURA_E_DESENVOLVIMENTO.md` → Seção "Padrões e Boas Práticas" |

---

## 📖 Outras Referências

- **Skills do Agente**: `.agent/skills/`
  - `arquitetura-sistema/SKILL.md` - Resumo da arquitetura (referencia este doc)
  - `dev-temas-layouts/SKILL.md` - Guia rápido de desenvolvimento (referencia este doc)
  
- **Regras do Projeto**: `.agent/rules/project-standards/project-standards.md`
  - Padrões de código Vue 3 + PrimeVue 4
  - Regras de nomenclatura
  - Restrições técnicas

---

## 🔄 Atualização da Documentação

**Última consolidação**: 2026-02-08

Quando criar novos temas, layouts ou funcionalidades significativas:
1. Atualize `ARQUITETURA_E_DESENVOLVIMENTO.md` com as novas informações
2. Se necessário, atualize as skills em `.agent/skills/`
3. Mantenha este índice atualizado

---

## ✅ Princípios da Documentação

1. **Um único documento central** para arquitetura e desenvolvimento
2. **Documentos separados** apenas para domínios muito distintos (ex: autenticação)
3. **Evitar duplicação** - use referências entre documentos
4. **Manter coerência** - atualizar todos os lugares afetados por uma mudança
5. **Arquivar** documentos obsoletos ao invés de deletá-los
