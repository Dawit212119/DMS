import { PDFDocument } from "pdf-lib";
const embedQRCodeInPDF = async (
  pdfBuffer: Buffer,
  qrBuffer: Buffer
): Promise<Buffer> => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const firstPage = pdfDoc.getPages()[0];
  const { width, height } = firstPage.getSize();

  const qrImage = await pdfDoc.embedPng(qrBuffer);
  firstPage.drawImage(qrImage, {
    x: width - 150,
    y: height - 150,
    width: 100,
    height: 100,
  });

  return Buffer.from(await pdfDoc.save());
};
export default embedQRCodeInPDF;
