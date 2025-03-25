"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]); // updated type for files

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`);
      setFiles(res.data); // Assuming the response contains the necessary file data
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      fetchFiles(); // Re-fetch files to display the new one
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  const getFileViewer = (fileUrl: string, fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return (
          <embed
            src={fileUrl}
            type="application/pdf"
            width="600"
            height="400"
          />
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <img src={fileUrl} alt={fileName} width="600" />;
      case "txt":
        return (
          <iframe
            src={fileUrl}
            width="600"
            height="400"
            title="Text File Viewer"
          />
        );
      default:
        return (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download {fileName}
          </a>
        );
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>File Upload to Firebase</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      <h3>Uploaded Files</h3>
      <ul>
        {files.map((f: any) => (
          <li key={f.id}>
            <p>{f.name}</p>
            {getFileViewer(f.url, f.name)}{" "}
            {/* Render appropriate file viewer */}
            {f.qrPDFUrl && (
              <div>
                <p>QR Code PDF:</p>
                <a href={f.qrPDFUrl} target="_blank" rel="noopener noreferrer">
                  View QR Code PDF
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
