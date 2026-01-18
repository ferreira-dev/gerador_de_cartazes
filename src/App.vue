<script setup>
import { computed } from 'vue';
import { usePosterStore } from './stores/posterStore';
import { useExport } from './composables/useExport';

import TemplateGallery from './components/TemplateGallery.vue';
import ProductForm from './components/ProductForm.vue';
import PaperSizeSelector from './components/PaperSizeSelector.vue';
import PreviewCanvas from './components/PreviewCanvas.vue';
import Button from 'primevue/button';

const store = usePosterStore();
const { downloadPNG, downloadPDF, isExporting, handlePrint } = useExport();

const handleExportPNG = () => {
    downloadPNG(`${store.posterData.productName || 'cartaz'}.png`);
};

const handleExportPDF = () => {
    // Determine orientation based on store if needed, currently store has it but not used in UI yet
    // Assuming portrait for now matching the default templates
    downloadPDF(`${store.posterData.productName || 'cartaz'}.pdf`, store.paperSize, 'p');
};

const storeCurrentPaper = computed(() => store.paperSize);
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-sans">
    
    <!-- Navbar -->
    <header class="bg-white shadow-sm border-b border-slate-200 z-50 sticky top-0">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-slate-800 leading-tight">Gerador de Cartazes</h1>
            <p class="text-[10px] bg-blue-100 text-blue-700 px-1.5 rounded w-fit font-medium">MVP Beta teste</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
            <a href="#" class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">Ajuda</a>
        </div>
      </div>
    </header>

    <main class="flex-1 container mx-auto p-4 lg:p-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        <!-- Sidebar -->
        <div class="lg:col-span-4 lg:h-[calc(100vh-100px)] flex flex-col overflow-hidden min-h-0">
          <div class="flex-1 overflow-y-auto pr-2 pb-6 custom-scrollbar space-y-6">
          
            <!-- Template Selection -->
            <section class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
              <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                Modelos
              </h2>
              <TemplateGallery />
            </section>

            <!-- Product Data Form -->
            <section class="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
               <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Editar Informações
              </h2>
              <ProductForm />
            </section>

          </div>
        </div>

        <!-- Main Preview Area -->
        <div class="lg:col-span-8 flex flex-col h-full overflow-hidden bg-white rounded-xl shadow-sm border border-slate-200">
          
          <!-- Toolbar -->
          <div class="p-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-white z-10">
            <div class="flex items-center gap-4">
               <div>
                  <span class="text-xs font-semibold text-slate-400 block mb-1">TAMANHO</span>
                  <PaperSizeSelector />
               </div>
            </div>

            <div class="flex items-center gap-2">
               <Button 
                label="PNG" 
                icon="pi pi-image" 
                severity="secondary" 
                outlined 
                size="small" 
                @click="handleExportPNG" 
                :loading="isExporting"
               />
                <Button 
                label="PDF" 
                icon="pi pi-file-pdf" 
                severity="danger" 
                outlined 
                size="small" 
                @click="handleExportPDF"
                :loading="isExporting"
               />
               <Button 
                label="Imprimir" 
                icon="pi pi-print" 
                severity="primary" 
                size="small" 
                @click="handlePrint"
                :loading="isExporting"
               />
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
             <!-- Background Grid Pattern -->
             <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#444 1px, transparent 1px); background-size: 20px 20px;"></div>
             
             <PreviewCanvas />
          </div>

          <!-- Footer/Status -->
           <div class="py-2 px-4 bg-white border-t border-slate-100 text-xs text-slate-400 flex justify-between items-center">
              <span>{{ storeCurrentPaper }} - Alta Resolução (300 DPI)</span>
              <span>Zoom automático</span>
           </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Custom Scrollbar for Sidebar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 20px;
}
</style>
