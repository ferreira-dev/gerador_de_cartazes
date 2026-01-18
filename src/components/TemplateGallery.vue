<script setup>
import { usePosterStore } from '../stores/posterStore';

const store = usePosterStore();

// Using store templates data
</script>

<template>
  <div class="grid grid-cols-1 gap-3">
    <div 
        v-for="template in store.templates" 
        :key="template.id"
        @click="store.setTemplate(template.id)"
        :class="[
            'cursor-pointer rounded-lg border p-2 flex items-center gap-4 transition-all',
            store.currentTemplateId === template.id
             ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-sm'
             : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
        ]"
    >
        <!-- Mock Thumbnail -->
        <div class="w-16 h-20 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center p-1 overflow-hidden relative">
            <div class="w-full h-2 bg-slate-300 mb-1 rounded-sm"></div>
            <div class="w-3/4 h-1.5 bg-slate-200 rounded-sm"></div>
            <div class="mt-2 text-[8px] font-bold text-red-500">R$</div>
        </div>
        
        <div class="flex-1 min-w-0">
            <div class="font-medium text-slate-800 text-sm truncate">{{ template.name }}</div>
            <div class="text-xs text-slate-500 truncate">{{ template.description }}</div>
            <div class="flex gap-1 mt-1">
                <span v-for="tag in template.tags" :key="tag" class="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                    {{ tag }}
                </span>
            </div>
        </div>
        
        <div v-if="store.currentTemplateId === template.id" class="text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
    </div>
  </div>
</template>
