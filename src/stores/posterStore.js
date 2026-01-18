import { defineStore } from 'pinia'
import templatesData from '../data/templates.json'

export const usePosterStore = defineStore('poster', {
    state: () => ({
        templates: templatesData,
        currentTemplateId: 'oferta-destaque',
        paperSize: 'A4', // A3, A4, A5
        orientation: 'portrait', // portrait, landscape
        posterData: {
            headerText: 'OFERTA',
            productName: 'PRODUTO',
            productDetail: 'MARCA/TIPO',
            price: 0.00
        },
        zoomLevel: 1.0
    }),

    getters: {
        currentTemplate: (state) => {
            return state.templates.find(t => t.id === state.currentTemplateId) || state.templates[0]
        },

        formattedPrice: (state) => {
            // Formatter for potential use, though template might handle it raw for styling
            return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(state.posterData.price)
        },

        priceParts: (state) => {
            const parts = state.posterData.price.toFixed(2).split('.');
            return {
                integer: parts[0],
                decimal: parts[1]
            }
        }
    },

    actions: {
        setTemplate(id) {
            this.currentTemplateId = id;
            // Reset data based on template defaults if needed? 
            // For now keep data to allow seamless switching if keys match
            const template = this.templates.find(t => t.id === id);
            if (template && template.defaults) {
                // Optional: merge defaults if fields are empty
            }
        },

        updatePosterData(newData) {
            this.posterData = { ...this.posterData, ...newData };
        },

        setPaperSize(size) {
            this.paperSize = size;
        },

        setZoom(level) {
            this.zoomLevel = level;
        }
    }
})
