import PDFKit, { file } from "pdfkit";

const createQRCodePDF = async (
  qrBuffer: Buffer,
  fileName: string
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const pdfDoc = new PDFKit();
    const chunks: Buffer[] = [];

    pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
    pdfDoc.on("error", reject);

    pdfDoc.image(qrBuffer, 50, 50, { width: 150, height: 150 });
    pdfDoc.text(`QR Code for: ${fileName}`, 50, 220);
    pdfDoc.end();
  });
};

const createPDF = async (
  images: Express.Multer.File[],
  qrcode: Buffer
): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    const pdfDoc = new PDFKit(); // 1️⃣ Create a new PDF document
    const chunks: Buffer[] = []; // 2️⃣ Array to store chunks

    // 3️⃣ Capture emitted PDF data in chunks
    pdfDoc.on("data", (chunk) => chunks.push(chunk));

    // 4️⃣ When PDF is done, resolve with the full Buffer
    pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));

    pdfDoc.on("error", reject); // Handle errors

    // 6️⃣ Iterate through images and add them to the PDF
    images.forEach((image, index) => {
      if (index > 0) pdfDoc.addPage(); // Add new page for each image

      // 7️⃣ Add the image
      pdfDoc.image(image.buffer, { fit: [500, 700], align: "center" });

      // 8️⃣ Add QR Code ONLY on the FIRST PAGE
      if (index === 0) {
        pdfDoc.image(qrcode, 300, 30, { width: 100, height: 100 });
      }
    });

    // 9️⃣ Finalize the PDF
    pdfDoc.end();
  });
};
export { createPDF, createQRCodePDF };
