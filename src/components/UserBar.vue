<template>
  <div class="user-bar">
    <!-- Usuário não autenticado -->
    <div v-if="!isAuthenticated && !loading" class="user-bar-guest">
      <Button 
        label="Entrar" 
        icon="pi pi-sign-in" 
        @click="mostrarModal = true"
        outlined
        size="small"
      />
    </div>

    <!-- Usuário autenticado -->
    <div v-else-if="isAuthenticated" class="user-bar-authenticated">
      <div class="user-info">
        <Avatar 
          :label="iniciais" 
          shape="circle" 
          class="user-avatar"
        />
        <div class="user-details">
          <span class="user-name">{{ nomeUsuario }}</span>
          <span class="user-email">{{ user.email }}</span>
        </div>
      </div>
      
      <Button 
        icon="pi pi-sign-out" 
        @click="handleLogout"
        text
        rounded
        severity="secondary"
        v-tooltip.bottom="'Sair'"
      />
    </div>

    <!-- Carregando -->
    <div v-else class="user-bar-loading">
      <Skeleton width="10rem" height="2.5rem" borderRadius="1.25rem" />
    </div>

    <AuthModal 
      v-model:visible="mostrarModal"
      @autenticado="handleAutenticado"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Skeleton from 'primevue/skeleton';
import AuthModal from './AuthModal.vue';
import { useAuth } from '@/composables/useAuth';
import { useToast } from 'primevue/usetoast';

const { user, loading, isAuthenticated, fazerLogout } = useAuth();
const toast = useToast();
const mostrarModal = ref(false);

const nomeUsuario = computed(() => {
  return user.value?.displayName || 'Usuário';
});

const iniciais = computed(() => {
  if (!user.value?.displayName) return 'U';
  
  const nomes = user.value.displayName.split(' ');
  if (nomes.length >= 2) {
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }
  return nomes[0][0].toUpperCase();
});

const handleAutenticado = () => {
  mostrarModal.value = false;
  toast.add({
    severity: 'success',
    summary: 'Bem-vindo!',
    detail: `Olá, ${nomeUsuario.value}!`,
    life: 3000
  });
};

const handleLogout = async () => {
  const resultado = await fazerLogout();
  
  if (resultado.success) {
    toast.add({
      severity: 'info',
      summary: 'Até logo!',
      detail: 'Você saiu da sua conta.',
      life: 3000
    });
  } else {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível sair. Tente novamente.',
      life: 3000
    });
  }
};
</script>

<style scoped>
.user-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-bar-authenticated {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-color);
}

.user-email {
  font-size: 0.75rem;
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .user-email {
    display: none;
  }
  
  .user-details {
    max-width: 8rem;
  }
  
  .user-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
