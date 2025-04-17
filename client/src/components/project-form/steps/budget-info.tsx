"use client";

import { useProjectForm } from "../project-form-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function BudgetInfo() {
  const { formData, updateFormData } = useProjectForm();

  const handleTotalChange = (value: string) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value);
    updateFormData({ total: numValue });
  };

  const handleSpentChange = (value: string) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value);
    updateFormData({ spent: numValue });
  };

  const remainingBudget = formData.total - formData.spent;
  const percentSpent =
    formData.total > 0 ? (formData.spent / formData.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="total">Total Budget</Label>
        <div className="relative">
          {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" /> */}
          <Input
            id="total"
            type="number"
            min="0"
            step="0.01"
            value={formData.total || ""}
            onChange={(e) => handleTotalChange(e.target.value)}
            placeholder="Enter total budget"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="spent">Amount Spent</Label>
        <div className="relative">
          {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" /> */}
          <Input
            id="spent"
            type="number"
            min="0"
            step="0.01"
            value={formData.spent || ""}
            onChange={(e) => handleSpentChange(e.target.value)}
            placeholder="Enter amount spent"
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Remaining Budget:</span>
              <span
                className={`font-semibold ETB{
                  remainingBudget < 0 ? "text-red-500" : ""
                }`}
              >
                ETB{remainingBudget.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Budget Utilization:</span>
                <span>{percentSpent.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ETB{
                    percentSpent > 100 ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `ETB{Math.min(percentSpent, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
