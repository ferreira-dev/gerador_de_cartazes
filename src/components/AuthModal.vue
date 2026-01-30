<template>
  <Dialog 
    v-model:visible="isVisible" 
    modal 
    :header="tituloModal"
    :style="{ width: '28rem' }"
    :closable="!loading"
    :closeOnEscape="!loading"
  >
    <!-- Modo: Login -->
    <form v-if="modo === 'login'" @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label for="email-login">E-mail</label>
        <InputText 
          id="email-login"
          v-model="email" 
          type="email" 
          placeholder="seu@email.com"
          :disabled="loading"
          required
          fluid
        />
      </div>

      <div class="form-group">
        <label for="senha-login">Senha</label>
        <Password 
          id="senha-login"
          v-model="senha" 
          placeholder="••••••••"
          :disabled="loading"
          :feedback="false"
          toggleMask
          required
          fluid
        />
      </div>

      <Message v-if="mensagemErro" severity="error" :closable="false">
        {{ mensagemErro }}
      </Message>

      <div class="form-actions">
        <Button 
          type="submit" 
          label="Entrar" 
          :loading="loading"
          fluid
        />
        
        <Button 
          type="button"
          label="Esqueci minha senha" 
          link
          @click="alternarModo('recuperar')"
          :disabled="loading"
          class="link-button"
        />
      </div>

      <Divider />

      <div class="form-footer">
        <span>Não tem uma conta?</span>
        <Button 
          type="button"
          label="Criar conta" 
          link
          @click="alternarModo('criar')"
          :disabled="loading"
        />
      </div>
    </form>

    <!-- Modo: Criar Conta -->
    <form v-else-if="modo === 'criar'" @submit.prevent="handleCriarConta" class="auth-form">
      <div class="form-group">
        <label for="nome-criar">Nome</label>
        <InputText 
          id="nome-criar"
          v-model="nome" 
          type="text" 
          placeholder="Seu nome"
          :disabled="loading"
          required
          fluid
        />
      </div>

      <div class="form-group">
        <label for="email-criar">E-mail</label>
        <InputText 
          id="email-criar"
          v-model="email" 
          type="email" 
          placeholder="seu@email.com"
          :disabled="loading"
          required
          fluid
        />
      </div>

      <div class="form-group">
        <label for="senha-criar">Senha</label>
        <Password 
          id="senha-criar"
          v-model="senha" 
          placeholder="Mínimo 6 caracteres"
          :disabled="loading"
          toggleMask
          required
          fluid
        >
          <template #footer>
            <Divider />
            <p class="password-hint">Sugestões:</p>
            <ul class="password-requirements">
              <li>Pelo menos 8 caracteres</li>
              <li>Combine letras e números</li>
            </ul>
          </template>
        </Password>
      </div>

      <Message v-if="mensagemErro" severity="error" :closable="false">
        {{ mensagemErro }}
      </Message>

      <div class="form-actions">
        <Button 
          type="submit" 
          label="Criar conta" 
          :loading="loading"
          fluid
        />
      </div>

      <Divider />

      <div class="form-footer">
        <span>Já tem uma conta?</span>
        <Button 
          type="button"
          label="Fazer login" 
          link
          @click="alternarModo('login')"
          :disabled="loading"
        />
      </div>
    </form>

    <!-- Modo: Recuperar Senha -->
    <form v-else-if="modo === 'recuperar'" @submit.prevent="handleRecuperarSenha" class="auth-form">
      <p class="recuperar-descricao">
        Digite seu e-mail e enviaremos um link para redefinir sua senha.
      </p>

      <div class="form-group">
        <label for="email-recuperar">E-mail</label>
        <InputText 
          id="email-recuperar"
          v-model="email" 
          type="email" 
          placeholder="seu@email.com"
          :disabled="loading"
          required
          fluid
        />
      </div>

      <Message v-if="mensagemErro" severity="error" :closable="false">
        {{ mensagemErro }}
      </Message>

      <Message v-if="mensagemSucesso" severity="success" :closable="false">
        {{ mensagemSucesso }}
      </Message>

      <div class="form-actions">
        <Button 
          type="submit" 
          label="Enviar link de recuperação" 
          :loading="loading"
          fluid
        />
      </div>

      <Divider />

      <div class="form-footer">
        <Button 
          type="button"
          label="Voltar ao login" 
          link
          @click="alternarModo('login')"
          :disabled="loading"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import Divider from 'primevue/divider';
import { useAuth } from '@/composables/useAuth';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modoInicial: {
    type: String,
    default: 'login',
    validator: (value) => ['login', 'criar', 'recuperar'].includes(value)
  }
});

const emit = defineEmits(['update:visible', 'autenticado']);

const { criarConta, fazerLogin, recuperarSenha } = useAuth();

// Estado do modal
const isVisible = ref(props.visible);
const modo = ref(props.modoInicial);
const loading = ref(false);

// Campos do formulário
const nome = ref('');
const email = ref('');
const senha = ref('');

// Mensagens
const mensagemErro = ref('');
const mensagemSucesso = ref('');

// Computed
const tituloModal = computed(() => {
  const titulos = {
    login: 'Entrar',
    criar: 'Criar Conta',
    recuperar: 'Recuperar Senha'
  };
  return titulos[modo.value];
});

// Watchers
watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

watch(isVisible, (newVal) => {
  emit('update:visible', newVal);
  if (!newVal) {
    limparFormulario();
  }
});

watch(modo, () => {
  limparMensagens();
});

// Métodos
const alternarModo = (novoModo) => {
  modo.value = novoModo;
  limparFormulario();
};

const limparFormulario = () => {
  nome.value = '';
  email.value = '';
  senha.value = '';
  limparMensagens();
};

const limparMensagens = () => {
  mensagemErro.value = '';
  mensagemSucesso.value = '';
};

const handleLogin = async () => {
  limparMensagens();
  loading.value = true;

  const resultado = await fazerLogin(email.value, senha.value);

  loading.value = false;

  if (resultado.success) {
    isVisible.value = false;
    emit('autenticado', resultado.user);
  } else {
    mensagemErro.value = resultado.error;
  }
};

const handleCriarConta = async () => {
  limparMensagens();
  loading.value = true;

  const resultado = await criarConta(email.value, senha.value, nome.value);

  loading.value = false;

  if (resultado.success) {
    isVisible.value = false;
    emit('autenticado', resultado.user);
  } else {
    mensagemErro.value = resultado.error;
  }
};

const handleRecuperarSenha = async () => {
  limparMensagens();
  loading.value = true;

  const resultado = await recuperarSenha(email.value);

  loading.value = false;

  if (resultado.success) {
    mensagemSucesso.value = 'Link de recuperação enviado! Verifique seu e-mail.';
    setTimeout(() => {
      alternarModo('login');
    }, 3000);
  } else {
    mensagemErro.value = resultado.error;
  }
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-color);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.link-button {
  font-size: 0.875rem;
}

.form-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.recuperar-descricao {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

.password-hint {
  margin: 0.5rem 0 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.password-requirements {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.password-requirements li {
  margin: 0.25rem 0;
}
</style>
