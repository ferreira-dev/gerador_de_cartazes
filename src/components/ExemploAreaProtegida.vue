<template>
  <ProtectedContent>
    <template #default="{ user }">
      <div class="exemplo-protegido">
        <Card>
          <template #title>
            Área Protegida
          </template>
          <template #content>
            <div class="user-info-display">
              <Avatar 
                :label="getIniciais(user.displayName)" 
                size="xlarge"
                shape="circle"
                class="user-avatar-large"
              />
              <div class="user-details-display">
                <h2>Bem-vindo, {{ user.displayName || 'Usuário' }}!</h2>
                <p class="user-email-display">{{ user.email }}</p>
                <p class="user-id-display">ID: {{ user.uid }}</p>
              </div>
            </div>

            <Divider />

            <div class="protected-features">
              <h3>Recursos Exclusivos</h3>
              <ul>
                <li>✅ Salvar cartazes na nuvem</li>
                <li>✅ Histórico de criações</li>
                <li>✅ Templates premium</li>
                <li>✅ Exportação ilimitada</li>
              </ul>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </ProtectedContent>
</template>

<script setup>
import ProtectedContent from '@/components/ProtectedContent.vue';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';

const getIniciais = (nome) => {
  if (!nome) return 'U';
  const nomes = nome.split(' ');
  if (nomes.length >= 2) {
    return (nomes[0][0] + nomes[nomes.length - 1][0]).toUpperCase();
  }
  return nomes[0][0].toUpperCase();
};
</script>

<style scoped>
.exemplo-protegido {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.user-info-display {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.user-avatar-large {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-600));
  color: white;
  font-weight: 700;
  font-size: 2rem;
}

.user-details-display h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1.5rem;
}

.user-email-display {
  color: var(--text-color-secondary);
  margin: 0.25rem 0;
  font-size: 0.875rem;
}

.user-id-display {
  color: var(--text-color-secondary);
  margin: 0.25rem 0;
  font-size: 0.75rem;
  font-family: monospace;
}

.protected-features {
  margin-top: 1rem;
}

.protected-features h3 {
  margin: 0 0 1rem 0;
  color: var(--text-color);
}

.protected-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.protected-features li {
  padding: 0.5rem 0;
  color: var(--text-color-secondary);
  font-size: 0.875rem;
}
</style>
