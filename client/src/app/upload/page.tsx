"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`);
      setFiles(res.data);
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
      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
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
            <a href={f?.url} target="_blank" rel="noopener noreferrer">
              {f.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
