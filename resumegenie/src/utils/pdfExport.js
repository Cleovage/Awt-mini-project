import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports a DOM element as a PDF file.
 * @param {HTMLElement} element - The DOM element to capture.
 * @param {string} filename - Download filename without extension.
 */
export async function exportToPDF(element, filename = 'resume') {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasAspect = canvas.height / canvas.width;
  const imgHeight = pdfWidth * canvasAspect;

  if (imgHeight <= pdfHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
  } else {
    // Multi-page export
    let yOffset = 0;
    let pageNum = 0;
    while (yOffset < imgHeight) {
      if (pageNum > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -yOffset, pdfWidth, imgHeight);
      yOffset += pdfHeight;
      pageNum++;
    }
  }

  pdf.save(`${filename}.pdf`);
}
