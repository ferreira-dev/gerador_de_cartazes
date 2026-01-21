<script setup>
import { computed } from 'vue';
import { usePosterStore } from '../stores/posterStore';
import OfertaDestaque from './templates/OfertaDestaque.vue';
import AtacadoVarejo from './templates/AtacadoVarejo.vue';

// Map template IDs to components
const components = {
  'oferta-destaque': OfertaDestaque,
  'atacado-varejo': AtacadoVarejo
};

const store = usePosterStore();

const currentComponent = computed(() => {
  return components[store.currentTemplateId] || null;
});

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
                v-if="currentComponent"
            />
             <div v-else class="flex items-center justify-center h-full text-slate-400">
                Template não encontrado
            </div>
        </div>
        
    </div>
</template>
