"use client";
import { useState, useRef, useActionState } from "react";
import Image from "next/image";
import useImageUploader from "@/app/action/useImageuploader";
const ImageUploader = () => {
  const [images, setImages] = useState<File[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { uploadFiles, isUploading, progress, error, result } =
    useImageUploader();
  // 📂 Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  // 📸 Capture image from camera
  const captureImage = () => {
    if (!start) {
      alert("please start the video");
      return;
    }
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 400, 400);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            setImages((prev) => [
              ...prev,
              new File([blob], `photo-${Date.now()}.jpg`, {
                type: "image/jpeg",
              }),
            ]);
          }
        }, "image/jpeg");
      }
    }
  };

  // 🎥 Start camera
  const startCamera = async () => {
    setStart(true);
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
  };

  // 📤 Upload images to backend
  const handleUpload = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop()); // Stop previous stream
    }
    alert("upload");
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    const res = await uploadFiles(formData);
    // const res = await fetch("http://localhost:5000/upload/image", {
    //   method: "POST",
    //   body: formData,
    // });

    setPdfUrl(res?.pdfUrl ?? null);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold">Upload or Capture Images</h2>

      {/* 📸 Camera Capture */}
      <div className="my-4">
        <video
          ref={videoRef}
          autoPlay
          className="border transform scale-x-[-1]" // Flip horizontally
          width="300"
          height="300"
        ></video>
        <canvas
          ref={canvasRef}
          className="hidden"
          width="300"
          height="300"
        ></canvas>
        <div className="mt-2">
          <button
            onClick={startCamera}
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Camera
          </button>
          <button
            onClick={captureImage}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Capture Image
          </button>
        </div>
      </div>

      {/* 📂 File Upload */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* 🖼 Preview selected images */}
      <div className="flex gap-2 flex-wrap">
        {images.map((img, index) => (
          <Image
            key={index}
            width={100}
            height={100}
            src={URL.createObjectURL(img)}
            alt="preview"
            className="w-24 h-24 object-cover"
          />
        ))}
      </div>

      {/* 📤 Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
      >
        Upload Images
      </button>

      {/* 📄 PDF Result */}
      {pdfUrl && (
        <p className="mt-4">
          PDF Generated:{" "}
          <a href={pdfUrl} target="_blank" className="text-blue-500 underline">
            {pdfUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
