import { useState } from "react";
import axios from "axios";
import { kMaxLength } from "buffer";

const useFileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState(null);

  const uploadFiles = async (file: FormData) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    console.log(file);
    try {
      const response = await axios.post(
        `http://localhost:8000/upload/files`,
        file,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );

      const data = response.data;
      console.log(data);
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

export default useFileUploader;
