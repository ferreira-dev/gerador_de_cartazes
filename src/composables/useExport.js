import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

export function useExport() {
    const isExporting = ref(false);

    // Helper to clone and prepare element for clean capture
    const prepareCaptureElement = async () => {
        const originalElement = document.querySelector('#poster-canvas');
        if (!originalElement) return null;

        // Clone the element
        const clone = originalElement.cloneNode(true);

        // Create an invisible container fixed at top-left
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '210mm'; // Standard A4 width
        container.style.height = 'auto';
        container.style.zIndex = '-9999';
        container.style.overflow = 'visible';

        // Add clone to container
        container.appendChild(clone);
        document.body.appendChild(container);

        // Wait for fonts and styles to settle
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 200));

        return { clone, container };
    };

    const downloadPNG = async (fileName = 'cartaz.png') => {
        try {
            isExporting.value = true;
            const capture = await prepareCaptureElement();
            if (!capture) return;
            const { clone, container } = capture;

            const dataUrl = await toPng(clone, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#ffffff',
                skipFonts: false,
                fontEmbedCSS: undefined // Let it auto-detect
            });

            // Clean up
            document.body.removeChild(container);

            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Export failed', error);
        } finally {
            isExporting.value = false;
        }
    };

    const downloadPDF = async (fileName = 'cartaz.pdf', paperSize = 'a4', orientation = 'p') => {
        try {
            isExporting.value = true;
            const capture = await prepareCaptureElement();
            if (!capture) return;
            const { clone, container } = capture;

            // Captura de alta resolução
            const dataUrl = await toJpeg(clone, {
                quality: 1,
                pixelRatio: 4,
                backgroundColor: '#ffffff',
                skipFonts: false
            });

            // Clean up
            document.body.removeChild(container);

            // Gerar PDF
            const doc = new jsPDF({
                orientation: orientation === 'landscape' ? 'l' : 'p',
                unit: 'mm',
                format: paperSize.toLowerCase()
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();

            doc.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            doc.save(fileName);

        } catch (error) {
            console.error('PDF Export failed', error);
        } finally {
            isExporting.value = false;
        }
    };

    const handlePrint = async () => {
        try {
            isExporting.value = true;
            const capture = await prepareCaptureElement();
            if (!capture) return;
            const { clone, container } = capture;

            const dataUrl = await toPng(clone, {
                quality: 1,
                pixelRatio: 3,
                backgroundColor: '#ffffff',
                skipFonts: false
            });

            // Clean up
            document.body.removeChild(container);

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                <html>
                    <head>
                        <title>Imprimir Cartaz</title>
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            html, body {
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100%;
                                height: 100%;
                            }
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            img {
                                max-width: 100%;
                                height: auto;
                                display: block;
                            }
                            @media print {
                                @page {
                                    margin: 0;
                                    size: auto;
                                }
                                html, body {
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    width: 100%;
                                    height: 100%;
                                }
                                img {
                                    max-width: 100%;
                                    width: 100%;
                                    height: auto;
                                    page-break-inside: avoid;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <img src="${dataUrl}" onload="window.print();window.close()"/>
                    </body>
                </html>
            `);
                printWindow.document.close();
            }
        } catch (e) {
            console.error(e);
        } finally {
            isExporting.value = false;
        }
    };

    return {
        isExporting,
        downloadPNG,
        downloadPDF,
        handlePrint
    };
}
