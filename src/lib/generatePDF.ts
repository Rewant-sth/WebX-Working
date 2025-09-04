import html2pdf from 'html2pdf.js';

export const generatePDF = async (packageName: string) => {
    // Get the main content element by ID
    const contentElement = document.getElementById('pdf-content');
    if (!contentElement) {
        console.error('PDF content element not found');
        return;
    }

    // Create a clone of the content to modify
    const clonedContent = contentElement.cloneNode(true) as HTMLElement;

    // Prepare content for PDF
    const pdfContainer = document.createElement('div');
    pdfContainer.style.width = '210mm'; // A4 width
    pdfContainer.style.margin = '0 auto';
    pdfContainer.style.backgroundColor = 'white';

    // Clone the content into the container
    pdfContainer.appendChild(clonedContent);

    // Apply print-friendly styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        * {
            color: rgb(51, 51, 51) !important;
            background-color: white !important;
            border-color: rgb(229, 231, 235) !important;
            font-family: Arial, sans-serif !important;
            box-sizing: border-box !important;
        }
        h1, h2, h3, h4, h5, h6 {
            color: rgb(31, 41, 55) !important;
            break-after: avoid !important;
            page-break-after: avoid !important;
            margin-top: 20px !important;
        }
        img {
            max-width: 190mm !important; /* Accounting for margins */
            height: auto !important;
            margin: 10px auto !important;
            page-break-inside: avoid !important;
        }
        table {
            width: 100% !important;
            page-break-inside: avoid !important;
            margin: 10px 0 !important;
        }
        p {
            orphans: 3 !important;
            widows: 3 !important;
        }
        section, article {
            page-break-inside: avoid !important;
        }
        .w-full {
            width: 190mm !important; /* A4 width minus margins */
        }
        [class*="max-w-"] {
            max-width: 190mm !important;
        }
    `;
    pdfContainer.appendChild(printStyles);

    // Remove any unwanted elements from the clone
    const elementsToRemove = clonedContent.querySelectorAll('.sticky, .fixed');
    elementsToRemove.forEach(el => el.remove());

    const options = {
        margin: [10, 10, 10, 10], // top, right, bottom, left in mm
        filename: `${packageName.replace(/\s+/g, '-').toLowerCase()}-itinerary.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            windowWidth: 794, // A4 width in pixels at 96 DPI
            width: 794,
            height: pdfContainer.offsetHeight,
            backgroundColor: '#ffffff'
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            hotfixes: ['px_scaling']
        },
        pagebreak: {
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: ['img', 'table', 'section', 'article']
        }
    };

    try {
        await html2pdf().set(options).from(pdfContainer).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};
