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
    <div class="clean-header-wrapper relative w-full flex justify-center items-center mb-4 z-10">
      <div class="clean-header-bg"></div>
      <h1 
        class="clean-header-text text-red-600 z-10 relative uppercase"
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

    <!-- Price Section - Clean: centavos flutuando -->
    <div class="clean-price-section relative w-full flex justify-center items-center mb-16 z-10">
      <div class="clean-price-bg"></div>

      <div 
        class="relative z-10 flex items-start text-red-600 dropshadow-white leading-none clean-price-wrapper"
        :class="data.font"
      >
        <span class="clean-currency">R$</span>
        <span class="clean-integer">{{ priceParts.int }}</span>
        <span class="clean-decimal">,{{ priceParts.dec }}</span>
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

/* Clean Theme Price Styles */
.clean-price-wrapper {
    display: flex;
    align-items: flex-start;
    position: relative;
}

.clean-currency {
    font-size: 5cqw;
    margin-right: 0.5cqw;
    margin-top: 10cqw;
    line-height: 1;
}

.clean-integer {
    font-size: 35cqw;
    letter-spacing: 0.02em;
    line-height: 0.85;
}

.clean-decimal {
    font-size: 12cqw;
    margin-left: 0.5cqw;
    margin-top: 5cqw;
    line-height: 1;
}

/* Clean Theme Header Styles */
.clean-header-wrapper {
    height: 14cqw;
    position: relative;
}

.clean-header-bg {
    position: absolute;
    top: 0;
    left: 4%;
    right: 4%;
    bottom: 0;
    background-color: #facc15;
    transform: skewY(-2deg);
    z-index: 0;
    border-radius: 2px;
}

.clean-header-text {
    font-size: 10cqw;
    line-height: 1.1;
    letter-spacing: 0.05em;
    padding: 1cqw 0;
    z-index: 1;
}

/* Clean Theme Price Section Styles */
.clean-price-section {
    min-height: 45cqw;
    position: relative;
}

.clean-price-bg {
    position: absolute;
    top: 15%;
    left: -5%;
    right: -5%;
    bottom: 0;
    background-color: #facc15;
    transform: skewY(1deg);
    z-index: 0;
}
</style>
