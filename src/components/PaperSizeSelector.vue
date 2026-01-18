<script setup>
import { usePosterStore } from '../stores/posterStore';

const store = usePosterStore();

const sizes = [
    { label: 'A3', value: 'A3', desc: '297x420mm', icon: 'M5 3h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z' },
    { label: 'A4', value: 'A4', desc: '210x297mm', icon: 'M6 4h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
    { label: 'A5', value: 'A5', desc: '148x210mm', icon: 'M7 5h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z' },
];
</script>

<template>
  <div class="flex gap-2">
    <button 
        v-for="size in sizes" 
        :key="size.value"
        @click="store.setPaperSize(size.value)"
        :class="[
            'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors',
            store.paperSize === size.value 
                ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
        ]"
        :title="size.desc"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path :d="size.icon" />
        </svg>
        {{ size.label }}
    </button>
  </div>
</template>
