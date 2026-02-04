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

    <!-- Price Section - Conditional based on Template -->
    <div v-if="store.currentLayoutId === 'atacado-varejo'" class="grid grid-cols-12 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
        
        <div class="col-span-12">
            <label class="text-xs font-bold text-blue-600 uppercase mb-2 block">Regra de Atacado</label>
        </div>

        <div class="col-span-12">
            <label for="price_retail" class="text-[10px] font-semibold text-slate-500 uppercase">Preço Varejo (1 UN)</label>
            <InputNumber 
                id="price_retail" 
                v-model="store.posterData.priceRetail" 
                mode="currency" 
                currency="BRL" 
                locale="pt-BR" 
                class="w-full" 
                :min="0"
            />
        </div>

        <div class="col-span-6">
            <label for="min_qty" class="text-[10px] font-semibold text-slate-500 uppercase">A partir de (UN)</label>
            <InputNumber 
                id="min_qty" 
                v-model="store.posterData.minQuantity" 
                showButtons
                :min="2"
                class="w-full" 
            />
        </div>

        <div class="col-span-6">
            <label for="price_wholesale" class="text-[10px] font-semibold text-slate-500 uppercase">Preço Atacado</label>
            <InputNumber 
                id="price_wholesale" 
                v-model="store.posterData.priceWholesale" 
                mode="currency" 
                currency="BRL" 
                locale="pt-BR" 
                class="w-full" 
                :min="0"
                inputClass="text-red-600 font-bold"
            />
        </div>
    </div>

    <div v-else class="flex flex-col gap-1">
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
