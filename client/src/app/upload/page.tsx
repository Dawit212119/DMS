"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const API_URL = "http://localhost:5000";

interface FileItem {
  id: string;
  name: string;
  url: string;
  qrPDFUrl?: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
      alert("Failed to load files");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      await fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const getFileViewer = (fileUrl: string, fileName: string) => {
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return (
          <div className="pdf-viewer">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                fileUrl
              )}&embedded=true`}
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title={`PDF: ${fileName}`}
            />
            <div className="pdf-actions">
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-download-btn"
              >
                Open Original PDF
              </a>
            </div>
          </div>
        );

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <div className="image-viewer">
            <Image
              src={fileUrl}
              alt={fileName}
              width={600}
              height={400}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        );

      default:
        return (
          <div className="file-download">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="download-btn"
            >
              Download {fileName}
            </a>
          </div>
        );
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload to Firebase</h2>

      <div className="upload-controls">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button
          onClick={uploadFile}
          disabled={!file || isUploading}
          className="upload-btn"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <h3>Uploaded Files</h3>
      <div className="file-list">
        {files.length === 0 ? (
          <p>No files uploaded yet</p>
        ) : (
          files.map((f) => (
            <div key={f.id} className="file-item">
              <h4>{f.name}</h4>

              <div className="file-preview">{getFileViewer(f.url, f.name)}</div>

              {f.qrPDFUrl && (
                <div className="qr-pdf-section">
                  <h5>QR Code Version</h5>
                  <div className="qr-pdf-viewer">
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                        f.qrPDFUrl
                      )}&embedded=true`}
                      width="100%"
                      height="400px"
                      style={{ border: "none" }}
                      title={`QR PDF: ${f.name}`}
                    />
                  </div>
                  <div className="pdf-actions">
                    <a
                      href={f.qrPDFUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pdf-download-btn"
                    >
                      Open QR version PDF
                    </a>
                  </div>
                  <a
                    href={f.qrPDFUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qr-download-btn"
                  >
                    Download QR PDF
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .file-upload-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .upload-controls {
          margin: 20px 0;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .file-input {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .upload-btn {
          padding: 8px 16px;
          background: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .upload-btn:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        .file-list {
          margin-top: 20px;
        }
        .file-item {
          margin-bottom: 30px;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
        }
        .qr-pdf-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px dashed #ccc;
        }
        .pdf-actions,
        .qr-pdf-actions {
          margin-top: 10px;
          text-align: center;
        }
        .pdf-download-btn,
        .qr-download-btn,
        .download-btn {
          display: inline-block;
          padding: 8px 16px;
          background: #34a853;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 10px;
        }
        .file-preview {
          margin: 15px 0;
        }
      `}</style>
    </div>
  );
}

export default App;
