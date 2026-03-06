/**
 * Extracts text from a PDF file in the browser using pdfjs-dist.
 * @param {File} file - A PDF File object from an <input type="file">
 * @returns {Promise<string>} - Extracted plain text from all pages
 */
export async function extractTextFromPDF(file) {
  // Dynamic import to avoid pdfjs-dist loading worker at startup
  const pdfjsLib = await import('pdfjs-dist');

  // Point the worker to the bundled worker file via Vite's asset URL
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  const pageTexts = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    pageTexts.push(pageText);
  }

  return pageTexts.join('\n\n');
}
