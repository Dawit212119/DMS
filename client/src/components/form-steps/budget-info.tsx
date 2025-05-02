"use client";

import type { FormData } from "../project-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BudgetInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function BudgetInfo({
  formData,
  updateFormData,
}: BudgetInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Budget Information</h3>
      <p className="text-sm text-muted-foreground">
        Enter the financial details for your construction project.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="totalBudget">Total Budget (ETB)</Label>
          <Input
            id="totalBudget"
            type="number"
            value={formData.totalBudget}
            onChange={(e) => updateFormData({ totalBudget: e.target.value })}
            placeholder="Enter total budget"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amountSpent">Amount Spent (ETB)</Label>
          <Input
            id="amountSpent"
            type="number"
            value={formData.amountSpent}
            onChange={(e) => updateFormData({ amountSpent: e.target.value })}
            placeholder="Enter amount spent"
            required
          />
        </div>
      </div>

      {formData.totalBudget && formData.amountSpent && (
        <div className="mt-6 p-4 bg-muted rounded-md">
          <h4 className="font-medium mb-2">Budget Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Remaining Budget:</p>
              <p className="font-medium">
                ${Number(formData.totalBudget) - Number(formData.amountSpent)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Percentage Used:</p>
              <p className="font-medium">
                {Number(formData.totalBudget) > 0
                  ? Math.round(
                      (Number(formData.amountSpent) /
                        Number(formData.totalBudget)) *
                        100
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
