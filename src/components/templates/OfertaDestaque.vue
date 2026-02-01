<script setup>
import { computed } from 'vue';
import { usePosterStore } from '../../stores/posterStore';

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  scale: {
    type: Number,
    default: 1
  }
});

const store = usePosterStore();
const theme = computed(() => store.currentTheme);

const priceParts = computed(() => {
  const p = props.data.price || 0;
  const parts = p.toFixed(2).split('.');
  return {
    int: parts[0],
    dec: parts[1]
  };
});

// Determinar estilos baseados no tema
const backgroundStyle = computed(() => {
  if (theme.value.background.type === 'image') {
    return {
      backgroundImage: `url(${theme.value.background.value})`,
      backgroundSize: 'contain',
      backgroundPosition: 'top center, bottom center',
      backgroundRepeat: 'no-repeat'
    };
  }
  return {
    backgroundColor: theme.value.background.value
  };
});

const fontSizes = computed(() => theme.value.fontSize);
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col items-center pt-8 poster-container" :style="backgroundStyle">
    <!-- Header Section - Condicional baseado no tipo do tema -->
    <div v-if="theme.header.type === 'brush'" class="relative w-full flex justify-center items-center mb-4 z-10">
      <div class="absolute inset-0 bg-yellow-400 transform -skew-y-2 scale-y-110 opacity-90 z-0 mx-4 rounded-sm" style="clip-path: polygon(2% 10%, 98% 2%, 96% 92%, 4% 98%);"></div>
      
      <h1 
        class="text-red-600 text-[10cqw] leading-tight z-10 relative drop-shadow-sm uppercase tracking-wide py-2"
        :class="data.font"
      >
        {{ data.headerText || 'OFERTA' }}
      </h1>
    </div>

    <!-- Header com Imagem (Hortifruti/Açougue) -->
    <div v-else-if="theme.header.type === 'image'" class="relative w-full z-10 mb-4">
      <img :src="theme.header.value" alt="Header" class="w-full h-auto object-contain" style="max-height: 15cqw;" />
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

    <!-- Price Section -->
    <div class="relative w-full flex justify-center items-center mb-16 z-10 min-h-[45cqw]">
      <!-- Decorative background for price -->
       <div class="absolute inset-0 bg-yellow-400 transform skew-y-1 scale-x-110 bottom-0 top-[20%] z-0" style="clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);"></div>

      <!-- Layout Clean: centavos flutuando (original) -->
      <div 
        v-if="theme.id === 'clean'"
        class="relative z-10 flex items-baseline text-red-600 dropshadow-white leading-none"
        :class="data.font"
      >
        <span class="text-[5cqw] mr-2">R$</span>
        <span class="text-[35cqw] tracking-wide">{{ priceParts.int }}</span>
        <div class="flex flex-col self-start mt-[12cqw] ml-1">
            <span class="text-[12cqw] leading-none">,{{ priceParts.dec }}</span>
        </div>
      </div>

      <!-- Layout outros temas: tudo inline -->
      <div 
        v-else
        class="relative z-10 flex items-baseline text-red-600 dropshadow-white leading-none"
        :class="data.font"
      >
        <span :style="{ fontSize: fontSizes.priceDecimal }" class="mr-2">R$</span>
        <span :style="{ fontSize: fontSizes.priceInteger }" class="tracking-tight">{{ priceParts.int }}</span>
        <span :style="{ fontSize: fontSizes.priceInteger }" class="tracking-tight">,{{ priceParts.dec }}</span>
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
