import { defineStore } from 'pinia'
import themeLayoutsData from '../data/theme-layouts.json'

export const usePosterStore = defineStore('poster', {
    state: () => ({
        themeLayouts: themeLayoutsData,
        posterTheme: 'clean', // clean, padrao, hortifruti, acougue
        currentLayoutId: 'oferta-destaque', // oferta-destaque, atacado-varejo
        paperSize: 'A4', // A3, A4, A5
        orientation: 'portrait', // portrait, landscape
        posterData: {
            headerText: 'OFERTA',
            productName: 'PRODUTO',
            productDetail: 'MARCA/TIPO',
            price: 0.00,
            priceRetail: 0.00,
            priceWholesale: 0.00,
            minQuantity: 3,
            font: 'font-boogaloo'
        },
        zoomLevel: 1.0
    }),

    getters: {
        // Retorna a configuração completa do tema atual
        currentThemeConfig: (state) => {
            return state.themeLayouts[state.posterTheme] || state.themeLayouts['clean'];
        },

        // Retorna a lista de layouts disponíveis para o tema atual
        availableLayouts: (state) => {
            const theme = state.themeLayouts[state.posterTheme];
            if (!theme || !theme.layouts) return [];

            return Object.entries(theme.layouts).map(([id, layout]) => ({
                id,
                name: layout.name,
                description: layout.description,
                component: layout.component
            }));
        },

        // Retorna a configuração do layout atual dentro do tema selecionado
        currentLayoutConfig: (state) => {
            const theme = state.themeLayouts[state.posterTheme];
            if (!theme || !theme.layouts) return null;

            return theme.layouts[state.currentLayoutId] ||
                Object.values(theme.layouts)[0];
        },

        // Retorna o caminho do componente a ser carregado
        currentComponentPath: (state) => {
            const theme = state.themeLayouts[state.posterTheme];
            if (!theme || !theme.layouts) return null;

            const layout = theme.layouts[state.currentLayoutId];
            return layout ? layout.component : null;
        },

        // Getters legados para compatibilidade
        formattedPrice: (state) => {
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
        setLayout(layoutId) {
            // Verifica se o layout existe no tema atual
            const theme = this.themeLayouts[this.posterTheme];
            if (theme && theme.layouts && theme.layouts[layoutId]) {
                this.currentLayoutId = layoutId;
            }
        },

        setTheme(themeId) {
            if (this.themeLayouts[themeId]) {
                this.posterTheme = themeId;

                // Se o layout atual não existe no novo tema, seleciona o primeiro disponível
                const newTheme = this.themeLayouts[themeId];
                if (newTheme.layouts && !newTheme.layouts[this.currentLayoutId]) {
                    const firstLayoutId = Object.keys(newTheme.layouts)[0];
                    if (firstLayoutId) {
                        this.currentLayoutId = firstLayoutId;
                    }
                }
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
