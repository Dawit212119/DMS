const getFirebasePublicUrl = (bucketName: string, fileName: string): string => {
  const encodedFileName = encodeURIComponent(fileName)
    .replace(/'/g, "%27")
    .replace(/;/g, "%3B");
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedFileName}?alt=media`;
};
export default getFirebasePublicUrl;
