<script setup>
import { computed } from 'vue';

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

const priceParts = computed(() => {
  const p = props.data.price || 0;
  const parts = p.toFixed(2).split('.');
  return {
    int: parts[0],
    dec: parts[1]
  };
});
</script>

<template>
  <div class="w-full h-full bg-white relative overflow-hidden flex flex-col items-center pt-8 poster-container">
    <!-- Header Section with Yellow Brush Effect -->
    <div class="relative w-full flex justify-center items-center mb-4 z-10">
      <!-- Brush SVGs background could go here, simulating yellow marker -->
      <div class="absolute inset-0 bg-yellow-400 transform -skew-y-2 scale-y-110 opacity-90 z-0 mx-4 rounded-sm" style="clip-path: polygon(2% 10%, 98% 2%, 96% 92%, 4% 98%);"></div>
      
      <h1 class="font-marker text-red-600 text-[10cqw] leading-none z-10 relative drop-shadow-sm uppercase tracking-wide">
        {{ data.headerText || 'OFERTA' }}
      </h1>
    </div>

    <!-- Product Info -->
    <div class="flex-1 w-full flex flex-col items-center justify-start px-8 text-center z-10 space-y-2">
      <h2 class="font-marker text-black text-[12cqw] leading-[0.9] uppercase break-words w-full line-clamp-3">
        {{ data.productName || 'NOME DO PRODUTO' }}
      </h2>
      
      <p class="font-marker text-black text-[5cqw] opacity-80 uppercase">
        {{ data.productDetail || 'DETALHES DO PRODUTO' }}
      </p>
    </div>

    <!-- Price Section -->
    <div class="relative w-full flex justify-center items-baseline mb-16 z-10">
      <!-- Decorative background for price if needed -->
       <div class="absolute inset-0 bg-yellow-400 transform skew-y-1 scale-x-110 bottom-0 top-[20%] z-0" style="clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);"></div>

      <div class="relative z-10 flex items-start text-red-600 font-bangers dropshadow-white leading-none">
        <span class="text-[5cqw] mr-2 mt-4">R$</span>
        <span class="text-[35cqw] tracking-tighter">{{ priceParts.int }}</span>
        <div class="flex flex-col justify-start ml-1 mt-8">
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
