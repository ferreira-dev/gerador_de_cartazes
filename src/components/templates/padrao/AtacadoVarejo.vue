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

const backgroundStyle = computed(() => {
  if (props.themeConfig.background.type === 'image') {
    return {
      backgroundImage: `url(${props.themeConfig.background.value})`,
      backgroundSize: 'contain',
      backgroundPosition: 'top center, bottom center',
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
  <div class="w-full h-full relative overflow-hidden flex flex-col pt-4 px-4 poster-container border-8 border-red-600" :style="backgroundStyle">
    
    <!-- Cabeçalho Padrão - Pincelada amarela -->
    <div class="w-full text-center mb-2">
      <h1 
        class="text-red-600 text-[8cqw] leading-none uppercase tracking-tight py-1 bg-yellow-300 transform -rotate-1 shadow-sm inline-block px-4"
        :class="data.font"
      >
        {{ data.headerText || 'OFERTA IMPERDÍVEL' }}
      </h1>
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
      <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-2 relative mx-4">
        <span class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[3cqw] px-3 py-0.5 rounded-full uppercase font-bold tracking-wider">
          Unidade
        </span>
        <div class="flex items-baseline justify-center text-blue-900 leading-none mt-2" :class="data.font">
          <span class="text-[4cqw] mr-1">R$</span>
          <span :style="{ fontSize: fontSizes.priceInteger }">{{ retailParts.int }}</span>
          <span :style="{ fontSize: fontSizes.priceDecimal }">,{{ retailParts.dec }}</span>
        </div>
      </div>

      <!-- Preço Atacado (Maior Destaque) -->
      <div class="bg-yellow-400 border-4 border-red-600 rounded-xl p-4 relative shadow-lg transform scale-105 mx-2">
        <div class="absolute -top-4 left-0 w-full flex justify-center">
          <span class="bg-red-600 text-white text-[4cqw] px-4 py-1 rounded-md uppercase font-bold shadow-md transform -rotate-1">
            A partir de {{ data.minQuantity }} un
          </span>
        </div>
       
        <div class="flex items-baseline justify-center text-red-700 leading-none mt-4 drop-shadow-sm" :class="data.font">
          <span class="text-[6cqw] mr-2">R$</span>
          <span class="text-[22cqw]">{{ wholesaleParts.int }}</span>
          <div class="flex flex-col justify-start ml-1">
            <span class="text-[10cqw] leading-none">,{{ wholesaleParts.dec }}</span>
            <span class="text-[3cqw] text-red-800 font-bold uppercase mt-1">Nesta oferta</span>
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
</style>
