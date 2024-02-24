import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract';

export async function extractPdfIntoText(pathToPdf: string) {
  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {};
  const extractedData = await pdfExtract.extract(pathToPdf, options);
  let pdfTextData = '';

  extractedData.pages.forEach((eachPage) => {
    eachPage.content.forEach((eachContent) => {
      pdfTextData += eachContent.str;
    });
  });

  return pdfTextData;
}
