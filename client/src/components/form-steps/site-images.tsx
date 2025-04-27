import { useRef, useState } from "react";
import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  FileText,
  ImageIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import useImageUploader from "@/app/action/useImageuploader";
import { toast } from "sonner";
import Image from "next/image";

// Types

type ImageCategory =
  | "foundation"
  | "structural"
  | "electrical"
  | "plumbing"
  | "exterior"
  | "aerial";

interface SiteImageInProgress {
  title: string;
  location: string;
  category: ImageCategory;
  files: File[];
  isUploading: boolean;
}

interface SiteImagesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function SiteImages({
  formData,
  updateFormData,
}: SiteImagesProps) {
  const [newImages, setNewImages] = useState<SiteImageInProgress[]>([
    {
      title: "",
      location: "",
      category: "foundation",
      files: [],
      isUploading: false,
    },
  ]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { uploadFiles } = useImageUploader();

  const handleGroupUpload = async (index: number) => {
    const current = newImages[index];

    if (!current.files.length) {
      toast.error("Please add images before uploading.");
      return;
    }

    const uploadData = new FormData();
    current.files.forEach((file) => {
      uploadData.append("images", file);
    });

    try {
      setNewImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, isUploading: true } : img
        )
      );

      const res = await uploadFiles(uploadData);

      if (!res.fileURL) {
        throw new Error("Failed to generate PDF");
      }

      const uploadedImage = {
        id: `img-${Date.now()}`,
        title: current.title,
        location: current.location,
        category: current.category,
        imageUrl: res.fileURL, // Assuming the fileURL is the image URL
        fileName: current.files[0]?.name || "unknown", // Use the first file's name or a default
      };

      updateFormData({
        siteImages: [...formData.siteImages, uploadedImage],
      });
      console.log(formData);
      toast.success("PDF generated and linked successfully");

      setNewImages([
        {
          title: "",
          location: "",
          category: "foundation",
          files: [],
          isUploading: false,
        },
      ]);
    } catch (error) {
      console.error("Upload error", error);
      toast.error("Upload failed");
    } finally {
      setNewImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, isUploading: false } : img
        )
      );
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      setNewImages((prev) =>
        prev.map((img, i) =>
          i === index
            ? {
                ...img,
                files: [...img.files, ...files],
                title: img.title || files[0].name.split(".")[0],
              }
            : img
        )
      );
      toast.success(`${files.length} image(s) added`);
    }
  };

  const handleDeleteImage = (index: number, fileIndex: number) => {
    setNewImages((prev) =>
      prev.map((img, i) =>
        i === index
          ? {
              ...img,
              files: img.files.filter((_, idx) => idx !== fileIndex),
            }
          : img
      )
    );
    toast.success("Image deleted");
  };

  const startCamera = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && activeImageIndex !== null) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const newFile = new File([blob], `capture-${Date.now()}.jpg`, {
                type: "image/jpeg",
              });

              setNewImages((prev) =>
                prev.map((img, i) =>
                  i === activeImageIndex
                    ? {
                        ...img,
                        files: [...img.files, newFile],
                        title:
                          img.title ||
                          `Photo ${new Date().toLocaleTimeString()}`,
                      }
                    : img
                )
              );
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setActiveImageIndex(null);
    setCameraError(null);
  };

  const isUploadComplete =
    newImages.length === 1 && newImages[0].files.length === 0;

  return (
    <div className="space-y-6">
      {newImages.map((img, index) => (
        <Card key={index} className="p-4">
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Title"
                value={img.title}
                onChange={(e) =>
                  setNewImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, title: e.target.value } : item
                    )
                  )
                }
              />
              <Input
                placeholder="Location"
                value={img.location}
                onChange={(e) =>
                  setNewImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, location: e.target.value } : item
                    )
                  )
                }
              />
              <Select
                value={img.category}
                onValueChange={(value: ImageCategory) =>
                  setNewImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, category: value } : item
                    )
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "foundation",
                    "structural",
                    "electrical",
                    "plumbing",
                    "exterior",
                    "aerial",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  setIsCameraActive(true);
                  startCamera();
                  setActiveImageIndex(index);
                }}
              >
                <Camera />
              </Button>
              <Button
                type="button"
                onClick={() => handleGroupUpload(index)}
                disabled={img.isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {img.isUploading ? "Uploading..." : "Upload Group"}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {img.files.map((file, i) => (
                <div key={i} className="relative w-full h-32">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteImage(index, i)}
                    className="absolute top-0 right-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {isCameraActive && (
        <div className="space-y-2">
          <video
            ref={videoRef}
            autoPlay
            className="w-full max-w-md mx-auto rounded shadow"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-4 justify-center">
            <Button onClick={captureImage}>Capture</Button>
            <Button variant="outline" onClick={stopCamera}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <Button
        type="button"
        onClick={() => {
          setNewImages((prev) => [
            ...prev,
            {
              title: "",
              location: "",
              category: "foundation",
              files: [],
              isUploading: false,
            },
          ]);
        }}
        disabled={!isUploadComplete}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Image Group
      </Button>
    </div>
  );
}
