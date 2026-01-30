<template>
  <div v-if="!loading">
    <!-- Usuário autenticado: mostra o conteúdo -->
    <slot v-if="isAuthenticated" :user="user"></slot>
    
    <!-- Usuário não autenticado: mostra mensagem ou modal -->
    <div v-else class="auth-required-container">
      <Card class="auth-required-card">
        <template #header>
          <div class="auth-required-icon">
            <i class="pi pi-lock" style="font-size: 3rem"></i>
          </div>
        </template>
        <template #title>Autenticação Necessária</template>
        <template #content>
          <p class="auth-required-message">
            Você precisa estar autenticado para acessar este conteúdo.
          </p>
          <Button 
            label="Fazer Login" 
            icon="pi pi-sign-in" 
            @click="mostrarModal = true"
            class="auth-required-button"
          />
        </template>
      </Card>

      <AuthModal 
        v-model:visible="mostrarModal"
        @autenticado="handleAutenticado"
      />
    </div>
  </div>
  
  <!-- Estado de carregamento -->
  <div v-else class="loading-container">
    <ProgressSpinner />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import AuthModal from './AuthModal.vue';
import { useAuth } from '@/composables/useAuth';

const { user, loading, isAuthenticated } = useAuth();
const mostrarModal = ref(false);

const handleAutenticado = () => {
  mostrarModal.value = false;
};
</script>

<style scoped>
.auth-required-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.auth-required-card {
  max-width: 28rem;
  width: 100%;
  text-align: center;
}

.auth-required-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--primary-color);
}

.auth-required-message {
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.auth-required-button {
  width: 100%;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
</style>
