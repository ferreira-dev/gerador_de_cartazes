<script setup>
import { computed, defineAsyncComponent, markRaw } from 'vue';
import { usePosterStore } from '../stores/posterStore';

// Mapeamento de componentes por tema/layout
const componentMap = {
  'clean/OfertaDestaque': markRaw(defineAsyncComponent(() => import('./templates/clean/OfertaDestaque.vue'))),
  'clean/AtacadoVarejo': markRaw(defineAsyncComponent(() => import('./templates/clean/AtacadoVarejo.vue'))),
  'padrao/OfertaDestaque': markRaw(defineAsyncComponent(() => import('./templates/padrao/OfertaDestaque.vue'))),
  'padrao/AtacadoVarejo': markRaw(defineAsyncComponent(() => import('./templates/padrao/AtacadoVarejo.vue'))),
  'padrao/AtacadoVarejo2': markRaw(defineAsyncComponent(() => import('./templates/padrao/AtacadoVarejo2.vue'))),
  'hortifruti/OfertaDestaque': markRaw(defineAsyncComponent(() => import('./templates/hortifruti/OfertaDestaque.vue'))),
  'hortifruti/AtacadoVarejo': markRaw(defineAsyncComponent(() => import('./templates/hortifruti/AtacadoVarejo.vue'))),
  'hortifruti/AtacadoVarejo2': markRaw(defineAsyncComponent(() => import('./templates/hortifruti/AtacadoVarejo2.vue'))),
  'acougue/OfertaDestaque': markRaw(defineAsyncComponent(() => import('./templates/acougue/OfertaDestaque.vue'))),
  'acougue/AtacadoVarejo': markRaw(defineAsyncComponent(() => import('./templates/acougue/AtacadoVarejo.vue'))),
  'acougue/AtacadoVarejo2': markRaw(defineAsyncComponent(() => import('./templates/acougue/AtacadoVarejo2.vue')))
};

const store = usePosterStore();

// Retorna o componente atual baseado no tema e layout selecionados
const currentComponent = computed(() => {
  const componentPath = store.currentComponentPath;
  if (!componentPath) return null;
  return componentMap[componentPath] || null;
});

// Configuração do layout atual
const layoutConfig = computed(() => {
  const config = store.currentLayoutConfig;
  return config ? config.config : {};
});

// Configuração do tema atual
const themeConfig = computed(() => store.currentThemeConfig);

// Dimensions in mm
const paperSizes = {
  'A4': { width: 210, height: 297, label: 'A4' },
  'A3': { width: 297, height: 420, label: 'A3' },
  'A5': { width: 148, height: 210, label: 'A5' }
};

const currentSize = computed(() => paperSizes[store.paperSize]);

const aspectRatioStyle = computed(() => {
    const { width, height } = currentSize.value;
    return {
        aspectRatio: `${width}/${height}`
    };
});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center bg-slate-200 p-8 overflow-auto">
        
        <div 
            id="poster-canvas"
            class="bg-white shadow-2xl relative transform-gpu transition-all duration-300"
            :style="aspectRatioStyle"
            style="width: 100%; max-width: 500px;" 
        >
            <component 
                :is="currentComponent" 
                :data="store.posterData"
                :config="layoutConfig"
                :themeConfig="themeConfig"
                v-if="currentComponent"
            />
             <div v-else class="flex items-center justify-center h-full text-slate-400">
                Template não encontrado
            </div>
        </div>
        
    </div>
</template>
