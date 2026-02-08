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
const productInfoSpacingClass = computed(() => `space-y-${props.config.productInfoSpacing || '0'}`);
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col items-center pt-8 poster-container" :style="backgroundStyle">
    <!-- Header Section - Padrão: pincelada amarela -->
    <div class="relative w-full flex justify-center items-center mb-4 z-10" style="height: 14cqw;">
      <h1 
        class="text-red-600 z-10 relative uppercase text-[10cqw] leading-[1.1] tracking-wider py-[1cqw]"
        :class="data.font"
      >
        {{ data.headerText || 'OFERTA' }}
      </h1>
    </div>

    <!-- Product Info -->
    <div class="flex-1 w-full flex flex-col items-center justify-start px-8 text-center z-10" :class="productInfoSpacingClass">
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

    <!-- Price Section - Padrão: inline -->
    <div class="relative w-full flex justify-center items-center mb-16 z-10" style="min-height: 45cqw;">
      <div 
        class="relative z-10 flex items-baseline text-red-600 dropshadow-white leading-none"
        :class="data.font"
      >
        <span :style="{ fontSize: fontSizes.priceCurrency }" class="mr-2">R$</span>
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
