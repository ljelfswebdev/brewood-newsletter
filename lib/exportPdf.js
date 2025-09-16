import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

async function waitForImages(root) {
  const imgs = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    imgs.map((img) =>
      (img.decode ? img.decode() : Promise.resolve()).catch(() => {})
    )
  );
}

/**
 * Export all children with class `.a4` inside `container` to a single A4 PDF.
 * Client-side only (no Puppeteer needed).
 */
export async function exportContainerToPdf(container) {
  if (!container) return;

  const pages = Array.from(container.querySelectorAll('.a4'));
  if (!pages.length) return;

  // ensure images are decoded
  await waitForImages(container);

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const node = pages[i];

    const rect = node.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);

    const canvas = await html2canvas(node, {
      scale: 3, // bump up scale for sharper results
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: false,
      width,
      height,
      windowWidth: Math.max(document.documentElement.clientWidth, width),
      windowHeight: Math.max(document.documentElement.clientHeight, height),
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');

    if (i !== 0) pdf.addPage('a4', 'p');
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
  }

  pdf.save('newsletter.pdf');
}