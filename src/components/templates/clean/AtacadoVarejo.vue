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

const formatPrice = (val) => {
  const parts = (val || 0).toFixed(2).split('.');
  return {
    int: parts[0],
    dec: parts[1]
  };
};

const retailParts = computed(() => formatPrice(props.data.priceRetail));
const wholesaleParts = computed(() => formatPrice(props.data.priceWholesale));
const fontSizes = computed(() => props.config.fontSize);
</script>

<template>
  <div class="w-full h-full relative overflow-hidden flex flex-col pt-4 px-4 poster-container bg-white border-4 border-red-600">
    
    <!-- Cabeçalho Clean - Fundo amarelo liso -->
    <div class="w-full text-center mb-2">
      <div class="relative inline-block">
        <div class="clean-header-bg absolute inset-0"></div>
        <h1 
          class="relative text-red-600 text-[8cqw] leading-none uppercase tracking-tight py-2 px-6 z-10"
          :class="data.font"
        >
          {{ data.headerText || 'OFERTA IMPERDÍVEL' }}
        </h1>
      </div>
    </div>

    <!-- Produto -->
    <div class="w-full text-center flex flex-col items-center mb-4">
      <h2 
        :style="{ fontSize: fontSizes.productName }"
        class="text-black leading-tight uppercase w-full line-clamp-2"
        :class="data.font"
      >
        {{ data.productName || 'NOME DO PRODUTO' }}
      </h2>
      <p 
        :style="{ fontSize: fontSizes.productDetail }"
        class="text-slate-600 uppercase"
        :class="data.font"
      >
        {{ data.productDetail || 'DETALHES DO PRODUTO' }}
      </p>
    </div>

    <!-- Área de Preços -->
    <div class="flex-1 flex flex-col justify-center gap-4 text-center">
      
      <!-- Preço Varejo (Menor Destaque) -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-2 relative mx-4">
        <span class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-[3cqw] px-3 py-0.5 rounded-full uppercase font-bold tracking-wider">
          Unidade
        </span>
        <div class="flex items-start justify-center text-gray-800 leading-none mt-2" :class="data.font">
          <span :style="{ fontSize: fontSizes.priceCurrency }" class="mr-1 mt-[1cqw]">R$</span>
          <span :style="{ fontSize: fontSizes.priceInteger }" class="leading-[1]">{{ retailParts.int }}</span>
          <span :style="{ fontSize: fontSizes.priceDecimal }" class="mt-[1cqw] leading-[1]">,{{ retailParts.dec }}</span>
        </div>
      </div>

      <!-- Preço Atacado (Maior Destaque) -->
      <div class="bg-yellow-400 border-4 border-red-600 rounded-xl p-4 relative shadow-lg mx-2">
        <div class="absolute -top-4 left-0 w-full flex justify-center">
          <span class="bg-red-600 text-white text-[4cqw] px-4 py-1 rounded-md uppercase font-bold shadow-md">
            A partir de {{ data.minQuantity }} un
          </span>
        </div>
       
        <div class="flex items-start justify-center text-red-700 leading-none mt-4 drop-shadow-sm" :class="data.font">
          <span :style="{ fontSize: fontSizes.priceCurrency }" class="mr-2 mt-[2cqw]">R$</span>
          <span class="text-[20cqw] leading-[1]">{{ wholesaleParts.int }}</span>
          <div class="flex flex-col justify-start ml-1 mt-[2cqw]">
            <span class="text-[9cqw] leading-[1]">,{{ wholesaleParts.dec }}</span>
            <span class="text-[2.5cqw] text-red-800 font-bold uppercase mt-1">Nesta oferta</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Rodapé -->
    <div class="text-center pb-2 opacity-50 text-[2.5cqw]">
      Imagens meramente ilustrativas
    </div>

  </div>
</template>

<style scoped>
.poster-container {
    container-type: inline-size;
}

.clean-header-bg {
    background-color: #facc15;
    transform: skewY(-1deg);
}
</style>
