"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NewReportModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewReportModal({ open, onClose }: NewReportModalProps) {
  const [date, setDate] = useState<Date>();
  const [accomplishments, setAccomplishments] = useState<
    { id: number; text: string }[]
  >([]);
  const [plans, setPlans] = useState<{ id: number; text: string }[]>([]);

  const addAccomplishment = () => {
    setAccomplishments((prev) => [...prev, { id: Date.now(), text: "" }]);
  };

  const addPlan = () => {
    setPlans((prev) => [...prev, { id: Date.now(), text: "" }]);
  };

  const updateAccomplishment = (id: number, text: string) => {
    setAccomplishments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const updatePlan = (id: number, text: string) => {
    setPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  return (
    <div className="">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-4xl max-h-[80vh] overflow-y-auto "
          style={{ scrollbarWidth: "none" }}
        >
          <DialogHeader>
            <DialogTitle>New Weekly Report</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Projects
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chaka">
                      CHAKA Housing Development
                    </SelectItem>
                    <SelectItem value="agri-ayat">
                      Agri-Product Market Center (Ayat)
                    </SelectItem>
                    <SelectItem value="kings">King Tower</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Date Prepared
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "yyyy-MM-dd") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Report Week
                </label>
                <Input placeholder="2025-6th" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Form Type
                </label>
                <Select defaultValue="form">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Accomplishments Section */}
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-4">
                Accomplishments this Week
              </h3>
              {accomplishments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <Image src="" alt="No data" className="w-full h-[50%]" />
                  </div>
                  <p>No data</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accomplishments.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-12 text-center pt-2">{index + 1}</div>
                      <Input
                        value={item.text}
                        onChange={(e) =>
                          updateAccomplishment(item.id, e.target.value)
                        }
                        placeholder="Enter accomplishment"
                        className="flex-1"
                      />
                      <div className="w-24 text-center pt-2">Action</div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                onClick={addAccomplishment}
                variant="outline"
                className="w-full mt-4"
              >
                +
              </Button>
            </div>

            {/* Plans Section */}
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-4">
                Plans for this Week
              </h3>
              {plans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <Image src="" alt="No data" className="w-full h-full" />
                  </div>
                  <p>No data</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {plans.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-12 text-center pt-2">{index + 1}</div>
                      <Input
                        value={item.text}
                        onChange={(e) => updatePlan(item.id, e.target.value)}
                        placeholder="Enter plan"
                        className="flex-1"
                      />
                      <div className="w-24 text-center pt-2">Action</div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                onClick={addPlan}
                variant="outline"
                className="w-full mt-4"
              >
                +
              </Button>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-[#95C11F] hover:bg-[#84ac1b] text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
