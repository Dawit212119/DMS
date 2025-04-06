"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DocumentManager from "../document-management/document-management";

interface UploadModalProps {
  onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
  const [activeTab, setActiveTab] = useState("documents");

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Documents</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <DocumentManager />
        </div>
      </DialogContent>
    </Dialog>
  );
}
