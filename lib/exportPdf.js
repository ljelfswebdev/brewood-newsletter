import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export all elements with class `.a4` inside container into a single A4 PDF.
 */
export async function exportContainerToPdf(container) {
  const pages = Array.from(container.querySelectorAll('.a4'));
  if (!pages.length) return;

  const pdf = new jsPDF('p', 'mm', 'a4');

  for (let i = 0; i < pages.length; i++) {
    const node = pages[i];
    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: node.scrollWidth,
    });
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  }

  pdf.save('newsletter.pdf');
}
