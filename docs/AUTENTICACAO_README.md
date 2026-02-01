# 🔐 Autenticação Firebase - Guia Rápido

## ✅ Instalação Concluída

O sistema de autenticação Firebase foi implementado com sucesso! 

## 📦 Componentes Disponíveis

### 1. **AuthModal** - Modal de Autenticação
Modal híbrido com 3 modos: Login, Criar Conta e Recuperar Senha

```vue
<AuthModal v-model:visible="mostrarModal" />
```

### 2. **UserBar** - Barra de Usuário
Mostra botão de login ou informações do usuário autenticado

```vue
<UserBar />
```

### 3. **ProtectedContent** - Proteção de Conteúdo
Wrapper que só exibe conteúdo para usuários autenticados

```vue
<ProtectedContent>
  <template #default="{ user }">
    <!-- Conteúdo protegido -->
  </template>
</ProtectedContent>
```

## 🚀 Uso Rápido

### No seu componente:

```vue
<script setup>
import { useAuth } from '@/composables/useAuth';

const { user, isAuthenticated, fazerLogin, fazerLogout } = useAuth();
</script>

<template>
  <div v-if="isAuthenticated">
    Bem-vindo, {{ user.displayName }}!
    <Button @click="fazerLogout">Sair</Button>
  </div>
</template>
```

## 📚 Documentação Completa

Consulte `docs/AUTENTICACAO.md` para documentação detalhada.

## 🎯 Próximos Passos

1. **Instalar Firebase** (se ainda não instalado):
   ```bash
   npm install firebase
   ```

2. **Testar o sistema**:
   - Inicie o servidor: `npm run dev`
   - Clique em "Entrar" no header
   - Crie uma conta de teste

3. **Proteger conteúdo**:
   - Use `<ProtectedContent>` onde necessário
   - Ou verifique `isAuthenticated` manualmente

## 🔧 Arquivos Criados

- ✅ `src/composables/useAuth.js` - Lógica de autenticação
- ✅ `src/components/AuthModal.vue` - Modal de login/cadastro
- ✅ `src/components/UserBar.vue` - Barra de usuário
- ✅ `src/components/ProtectedContent.vue` - Proteção de conteúdo
- ✅ `src/components/ExemploAreaProtegida.vue` - Exemplo de uso
- ✅ `src/firebase/index.js` - Configuração Firebase (atualizado)
- ✅ `src/main.js` - ToastService adicionado
- ✅ `src/App.vue` - UserBar e Toast integrados

## ⚠️ Importante

- O Firebase Auth mantém o usuário logado entre sessões
- Todas as credenciais estão no arquivo `.env`
- O sistema usa e-mail/senha como método de autenticação
