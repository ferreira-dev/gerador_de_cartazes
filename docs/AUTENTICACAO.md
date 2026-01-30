# Sistema de Autenticação Firebase

Este documento explica como usar o sistema de autenticação implementado no projeto.

## 📁 Arquivos Criados

### 1. **Composables**
- `src/composables/useAuth.js` - Composable principal de autenticação

### 2. **Componentes**
- `src/components/AuthModal.vue` - Modal híbrido de login/criação/recuperação
- `src/components/UserBar.vue` - Barra de usuário no header
- `src/components/ProtectedContent.vue` - Wrapper para proteger conteúdo

### 3. **Configuração**
- `src/firebase/index.js` - Configuração e exports do Firebase

## 🚀 Como Usar

### 1. Usar o Composable de Autenticação

```javascript
import { useAuth } from '@/composables/useAuth';

const { 
  user,              // Usuário atual (null se não autenticado)
  loading,           // Estado de carregamento
  isAuthenticated,   // Boolean - usuário está autenticado?
  criarConta,        // Função para criar conta
  fazerLogin,        // Função para fazer login
  fazerLogout,       // Função para fazer logout
  recuperarSenha     // Função para recuperar senha
} = useAuth();
```

### 2. Proteger Componentes/Páginas

#### Opção A: Usando o componente `ProtectedContent`

```vue
<template>
  <ProtectedContent>
    <template #default="{ user }">
      <!-- Conteúdo protegido aqui -->
      <h1>Bem-vindo, {{ user.displayName }}!</h1>
      <p>Este conteúdo só é visível para usuários autenticados.</p>
    </template>
  </ProtectedContent>
</template>

<script setup>
import ProtectedContent from '@/components/ProtectedContent.vue';
</script>
```

#### Opção B: Verificação manual no componente

```vue
<template>
  <div v-if="isAuthenticated">
    <!-- Conteúdo protegido -->
  </div>
  <div v-else>
    <p>Você precisa estar autenticado.</p>
    <Button @click="mostrarModal = true">Fazer Login</Button>
  </div>
  
  <AuthModal v-model:visible="mostrarModal" />
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import AuthModal from '@/components/AuthModal.vue';

const { isAuthenticated } = useAuth();
const mostrarModal = ref(false);
</script>
```

### 3. Usar o Modal de Autenticação

```vue
<template>
  <Button @click="mostrarModal = true">Login</Button>
  
  <AuthModal 
    v-model:visible="mostrarModal"
    modo-inicial="login"
    @autenticado="handleAutenticado"
  />
</template>

<script setup>
import { ref } from 'vue';
import AuthModal from '@/components/AuthModal.vue';

const mostrarModal = ref(false);

const handleAutenticado = (user) => {
  console.log('Usuário autenticado:', user);
  // Fazer algo após autenticação
};
</script>
```

**Props do AuthModal:**
- `visible` (Boolean) - Controla visibilidade do modal
- `modo-inicial` (String) - Modo inicial: 'login', 'criar' ou 'recuperar'

**Eventos:**
- `@update:visible` - Emitido quando o modal é fechado
- `@autenticado` - Emitido quando o usuário se autentica com sucesso

### 4. Adicionar a Barra de Usuário

A barra de usuário já foi adicionada ao `App.vue`, mas você pode usá-la em qualquer lugar:

```vue
<template>
  <UserBar />
</template>

<script setup>
import UserBar from '@/components/UserBar.vue';
</script>
```

## 🔐 Funções de Autenticação

### Criar Conta

```javascript
const { criarConta } = useAuth();

const resultado = await criarConta(email, senha, nome);

if (resultado.success) {
  console.log('Conta criada:', resultado.user);
} else {
  console.error('Erro:', resultado.error);
}
```

### Fazer Login

```javascript
const { fazerLogin } = useAuth();

const resultado = await fazerLogin(email, senha);

if (resultado.success) {
  console.log('Login realizado:', resultado.user);
} else {
  console.error('Erro:', resultado.error);
}
```

### Fazer Logout

```javascript
const { fazerLogout } = useAuth();

const resultado = await fazerLogout();

if (resultado.success) {
  console.log('Logout realizado');
}
```

### Recuperar Senha

```javascript
const { recuperarSenha } = useAuth();

const resultado = await recuperarSenha(email);

if (resultado.success) {
  console.log('E-mail de recuperação enviado');
} else {
  console.error('Erro:', resultado.error);
}
```

## 📊 Dados do Usuário

O objeto `user` contém as seguintes propriedades principais:

```javascript
{
  uid: 'string',           // ID único do usuário
  email: 'string',         // E-mail do usuário
  displayName: 'string',   // Nome do usuário
  photoURL: 'string',      // URL da foto (se houver)
  emailVerified: boolean   // E-mail verificado?
}
```

## 🎨 Personalização

### Customizar Mensagens de Erro

Edite a função `tratarErro` em `src/composables/useAuth.js`:

```javascript
const tratarErro = (err) => {
  const errorMessages = {
    'auth/email-already-in-use': 'Sua mensagem customizada',
    // ... adicione mais mensagens
  };
  return errorMessages[err.code] || 'Erro padrão';
};
```

## 🔒 Proteção de Rotas (Se usar Vue Router)

Se você adicionar Vue Router ao projeto, crie um guard de navegação:

```javascript
// router/index.js
import { useAuth } from '@/composables/useAuth';

router.beforeEach((to, from, next) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Aguardar carregamento do estado de autenticação
  if (loading.value) {
    // Aguardar ou mostrar loading
    return;
  }
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login');
  } else {
    next();
  }
});
```

## 📝 Notas Importantes

1. **Estado Global**: O estado de autenticação é global e compartilhado entre todos os componentes que usam `useAuth()`.

2. **Persistência**: O Firebase Auth mantém o usuário autenticado automaticamente entre sessões.

3. **Loading State**: Sempre verifique o estado `loading` antes de renderizar conteúdo baseado em autenticação.

4. **Tratamento de Erros**: Todas as funções retornam um objeto com `success` e `error` para facilitar o tratamento.

## 🐛 Troubleshooting

### Erro: "Firebase not installed"
Execute: `npm install firebase`

### Erro: "Auth domain not configured"
Verifique se todas as variáveis de ambiente estão configuradas no arquivo `.env`

### Modal não abre
Verifique se o ToastService está configurado no `main.js`
