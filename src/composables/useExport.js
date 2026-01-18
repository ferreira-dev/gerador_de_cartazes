import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

export function useExport() {
    const isExporting = ref(false);

    const getCanvasElement = () => {
        return document.querySelector('#poster-canvas');
    };

    const downloadPNG = async (fileName = 'cartaz.png') => {
        try {
            isExporting.value = true;
            const element = getCanvasElement();
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL('image/png');
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
            const element = getCanvasElement();
            if (!element) return;

            // 1. Capture High Res Image
            const canvas = await html2canvas(element, {
                scale: 4, // Very high quality for print
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // 2. Generate PDF
            // jsPDF units: mm is standard for paper sizes
            const doc = new jsPDF({
                orientation: orientation === 'landscape' ? 'l' : 'p',
                unit: 'mm',
                format: paperSize.toLowerCase()
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();

            doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            doc.save(fileName);

        } catch (error) {
            console.error('PDF Export failed', error);
        } finally {
            isExporting.value = false;
        }
    };

    const handlePrint = async () => {
        // For printing, usually opening the PDF or Image in new tab is best
        // Or simple window.print() if CSS @media print is clear
        // Here we will generate a blob and open it
        try {
            isExporting.value = true;
            const element = getCanvasElement();
            if (!element) return;

            const canvas = await html2canvas(element, { scale: 3 });
            const imgData = canvas.toDataURL('image/png');

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                <html>
                    <head><title>Imprimir Cartaz</title></head>
                    <body style="margin:0; display:flex; justify-content:center; align-items:center;">
                        <img src="${imgData}" style="max-width:100%; height:auto;" onload="window.print();window.close()"/>
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
