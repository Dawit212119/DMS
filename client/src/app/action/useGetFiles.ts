import { useState } from "react";
import axios from "axios";
interface FileItem {
  id: string;
  name: string;
  url: string;
  qrPDFUrl?: string;
}
const useGetFiles = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(null);

  const uploadFiles = async (): Promise<FileItem[]> => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/files`);

      const data = response.data;
      setResult(data);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      console.error("Upload error:", err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading, progress, error, result };
};

export default useGetFiles;
