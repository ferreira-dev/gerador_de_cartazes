<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  themeConfig: {
    type: Object,
    required: true
  }
});

const priceParts = computed(() => {
  const p = props.data.price || 0;
  const parts = p.toFixed(2).split('.');
  return {
    int: parts[0],
    dec: parts[1]
  };
});

const fontSizes = computed(() => props.config.fontSize);
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col items-center pt-8 poster-container bg-white">
    <!-- Header Section - Clean: fundo amarelo liso -->
    <div class="relative w-full flex justify-center items-center mb-4 z-10">
      <div class="absolute inset-0 bg-yellow-400 transform -skew-y-2 scale-y-110 opacity-90 z-0 mx-4 rounded-sm" style="clip-path: polygon(2% 10%, 98% 2%, 96% 92%, 4% 98%);"></div>
      <h1 
        class="text-red-600 text-[10cqw] leading-tight z-10 relative drop-shadow-sm uppercase tracking-wide py-2"
        :class="data.font"
      >
        {{ data.headerText || 'OFERTA' }}
      </h1>
    </div>

    <!-- Product Info -->
    <div class="flex-1 w-full flex flex-col items-center justify-start px-8 text-center z-10 space-y-2">
      <h2 
        :style="{ fontSize: fontSizes.productName }"
        class="text-black leading-normal uppercase break-words w-full line-clamp-3 py-4 px-4"
        :class="data.font"
      >
        {{ data.productName || 'NOME DO PRODUTO' }}
      </h2>
      
      <p 
        :style="{ fontSize: fontSizes.productDetail }"
        class="text-black opacity-80 uppercase leading-normal"
        :class="data.font"
      >
        {{ data.productDetail || 'DETALHES DO PRODUTO' }}
      </p>
    </div>

    <div class="relative w-full flex justify-center items-center mb-16 z-10 min-h-[45cqw]">
      <!-- Fundo amarelo simples sem clip-path -->
      <div class="absolute left-0 right-0 bg-yellow-400 z-0" style="top: 15cqw; bottom: 0;"></div>

      <div 
        class="relative z-10 flex items-baseline text-red-600 dropshadow-white leading-none"
        :class="data.font"
      >
        <!-- R$ -->
        <span :style="{ fontSize: fontSizes.priceCurrency }" class="mr-2">R$</span>
        
        <!-- Número Inteiro -->
        <span class="text-[35cqw] tracking-wide">{{ priceParts.int }}</span>
        
        <!-- Centavos -->
        <div class="flex flex-col self-start mt-[12cqw] ml-1">
            <span class="text-[12cqw] leading-none">,{{ priceParts.dec }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poster-container {
    container-type: inline-size;
}

.dropshadow-white {
    text-shadow: 
        3px 3px 0px #fff,
        -1px -1px 0 #fff,  
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
}
</style>
