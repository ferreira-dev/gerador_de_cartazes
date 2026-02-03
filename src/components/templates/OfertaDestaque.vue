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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
    <!-- Header Section - Clean e Padrão: pincelada amarela -->
    <div v-if="theme.header.type === 'brush'" class="clean-header-wrapper relative w-full flex justify-center items-center mb-4 z-10">
      <!-- Pincelada decorativa somente no tema Clean -->
      <div v-if="theme.id === 'clean'" class="clean-header-bg"></div>
      
      <h1 
        class="clean-header-text text-red-600 z-10 relative uppercase"
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
    <div class="clean-price-section relative w-full flex justify-center items-center mb-16 z-10">
      <!-- Decorative background for price - somente no tema Clean -->
      <div v-if="theme.id === 'clean'" class="clean-price-bg"></div>

      <!-- Layout Clean: centavos flutuando com posicionamento robusto para exportação -->
      <div 
        v-if="theme.id === 'clean'"
        class="relative z-10 flex items-start text-red-600 dropshadow-white leading-none clean-price-wrapper"
        :class="data.font"
      >
        <span class="clean-currency">R$</span>
        <span class="clean-integer">{{ priceParts.int }}</span>
        <span class="clean-decimal">,{{ priceParts.dec }}</span>
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

/* Clean Theme Price Styles - Robusto para exportação */
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

/* Clean Theme Header Styles - Robusto para exportação */
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
    background-color: #facc15; /* yellow-400 */
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

/* Clean Theme Price Section Styles - Robusto para exportação */
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
    background-color: #facc15; /* yellow-400 */
    transform: skewY(1deg);
    z-index: 0;
}
</style>
