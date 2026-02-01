<script setup>
import { usePosterStore } from '../stores/posterStore';
import Select from 'primevue/select';

const store = usePosterStore();

const themeOptions = [
  { name: 'Clean', value: 'clean' },
  { name: 'Padrão', value: 'padrao' },
  { name: 'Hortifruti', value: 'hortifruti' },
  { name: 'Açougue', value: 'acougue' }
];
</script>

<template>
  <div>
    <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
      Tema do Cartaz
    </label>
    <Select 
      v-model="store.posterTheme" 
      :options="themeOptions" 
      optionLabel="name" 
      optionValue="value" 
      placeholder="Selecione um tema" 
      class="w-full"
      @change="store.setTheme(store.posterTheme)"
    />
  </div>
</template>
