<script setup>
import { usePosterStore } from '../stores/posterStore';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';

const store = usePosterStore();
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-1">
      <label for="header" class="text-xs font-semibold text-slate-500 uppercase">Cabeçalho</label>
      <InputText id="header" v-model="store.posterData.headerText" placeholder="Ex: OFERTA" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="product" class="text-xs font-semibold text-slate-500 uppercase">Produto</label>
      <InputText id="product" v-model="store.posterData.productName" placeholder="Ex: ARROZ TIO JOÃO" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="detail" class="text-xs font-semibold text-slate-500 uppercase">Detalhes</label>
      <InputText id="detail" v-model="store.posterData.productDetail" placeholder="Ex: TIPO 1 - PCT 5KG" class="w-full" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="price" class="text-xs font-semibold text-slate-500 uppercase">Preço (R$)</label>
      <InputNumber 
        id="price" 
        v-model="store.posterData.price" 
        mode="currency" 
        currency="BRL" 
        locale="pt-BR" 
        class="w-full" 
        :min="0"
        :maxFractionDigits="2"
      />
    </div>
  </div>
</template>
