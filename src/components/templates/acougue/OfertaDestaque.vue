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

const backgroundStyle = computed(() => {
  if (props.themeConfig.background.type === 'image') {
    return {
      backgroundImage: `url(${props.themeConfig.background.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }
  return {
    backgroundColor: props.themeConfig.background.value
  };
});

const fontSizes = computed(() => props.config.fontSize);
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col items-center pt-8 poster-container" :style="backgroundStyle">
    <!-- Header Section - Açougue: imagem temática -->
    <div class="relative w-full z-10 mb-4">
      <img :src="themeConfig.header.value" alt="Header Açougue" class="w-full h-auto object-contain" style="max-height: 15cqw;" />
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

    <!-- Price Section - Inline -->
    <div class="relative w-full flex justify-center items-center mb-16 z-10" style="min-height: 45cqw;">
      <div 
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
