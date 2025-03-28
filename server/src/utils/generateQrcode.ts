import QRCode from "qrcode";

const generateQRCode = async (url: string): Promise<Buffer> => {
  return await QRCode.toBuffer(url);
};
export default generateQRCode;
