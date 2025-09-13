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
 * This version avoids foreignObject rendering (which can return blank canvases)
 * and explicitly sets width/height so html2canvas doesn't produce 0px images.
 */
export async function exportContainerToPdf(container) {
  if (!container) return;

  const pages = Array.from(container.querySelectorAll('.a4'));
  if (!pages.length) return;

  // ensure all images are decoded first
  await waitForImages(container);

  const pdf = new jsPDF('p', 'mm', 'a4');

  for (let i = 0; i < pages.length; i++) {
    const node = pages[i];

    // Make sure the node has a measurable size
    const width = node.scrollWidth || node.offsetWidth || 794;   // ~A4 @ 96dpi
    const height = node.scrollHeight || node.offsetHeight || 1123;

    const canvas = await html2canvas(node, {
      scale: Math.max(2, window.devicePixelRatio || 1),
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      // IMPORTANT: avoid foreignObject; it often causes blank renders with fonts/@imports
      foreignObjectRendering: false,
      width,
      height,
      windowWidth: Math.max(document.documentElement.clientWidth, width),
      windowHeight: Math.max(document.documentElement.clientHeight, height),
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    if (i !== 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
  }

  pdf.save('newsletter.pdf');
}