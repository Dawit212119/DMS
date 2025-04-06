"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Upload } from "lucide-react";

interface SuccessScreenProps {
  onUpload: () => void;
}

export default function SuccessScreen({ onUpload }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold mb-2">Project Created Successfully!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Your project has been created successfully. You can now upload
        additional documents and files related to this project.
      </p>

      <div className="space-y-4 w-full max-w-md">
        <Button
          onClick={onUpload}
          className="w-full flex items-center justify-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Project Files
        </Button>

        <Button variant="outline" className="w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
