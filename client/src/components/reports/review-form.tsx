import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Check, FileText, Save, Star } from "lucide-react";

export default function ReviewForm() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Review and evaluation form
        </h2>
        <p className="text-sm text-gray-500">
          Evaluate project performance and quality
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="review-id">Review ID</Label>
                    <Input id="review-id" placeholder="REV-2024-0025" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-date">Review Date</Label>
                    <div className="flex">
                      <Input
                        id="review-date"
                        type="date"
                        className="rounded-r-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kings-tower">
                          Kings Tower Apartments
                        </SelectItem>
                        <SelectItem value="chaka-housing">
                          CHAKA Housing Project
                        </SelectItem>
                        <SelectItem value="crystal-business">
                          CRYSTAL BUSINESS Tower
                        </SelectItem>
                        <SelectItem value="metro-office">
                          Metro Office Complex
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewer">Reviewer</Label>
                    <Select>
                      <SelectTrigger id="reviewer">
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andargachew">
                          Andargachew Mekonen
                        </SelectItem>
                        <SelectItem value="eyob">Eyob Tesfaye</SelectItem>
                        <SelectItem value="selam">Selam Bekele</SelectItem>
                        <SelectItem value="dawit">Dawit Kebede</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Quality of Work</Label>
                  <div className="space-y-4">
                    {qualityCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <Label
                          htmlFor={`rating-${category.id}`}
                          className="text-sm"
                        >
                          {category.label}
                        </Label>
                        <div className="flex items-center">
                          <RadioGroup
                            id={`rating-${category.id}`}
                            className="flex space-x-2"
                            defaultValue="3"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <div
                                key={rating}
                                className="flex flex-col items-center"
                              >
                                <RadioGroupItem
                                  value={rating.toString()}
                                  id={`rating-${category.id}-${rating}`}
                                  className="sr-only"
                                />
                                <Label
                                  htmlFor={`rating-${category.id}-${rating}`}
                                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 data-[state=checked]:bg-[#a3c639] data-[state=checked]:text-white"
                                >
                                  <Star
                                    className={`h-5 w-5 ${
                                      rating <= 3 ? "fill-current" : ""
                                    }`}
                                  />
                                </Label>
                                <span className="mt-1 text-xs">{rating}</span>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strengths">Project Strengths</Label>
                  <Textarea
                    id="strengths"
                    placeholder="What went well in this project?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areas-for-improvement">
                    Areas for Improvement
                  </Label>
                  <Textarea
                    id="areas-for-improvement"
                    placeholder="What could be improved in future projects?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Provide recommendations for future projects"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overall-comments">Overall Comments</Label>
                  <Textarea
                    id="overall-comments"
                    placeholder="Additional comments about the project"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    variant="default"
                    className="gap-1 bg-[#a3c639] hover:bg-[#8aaa2e]"
                  >
                    <Save className="h-4 w-4" />
                    Submit Evaluation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvaluations.map((evaluation) => (
                  <div
                    key={evaluation.id}
                    className="flex items-start gap-3 rounded-md border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <FileText className="mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{evaluation.project}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <span>Reviewed by: {evaluation.reviewer}</span>
                        <span className="mx-2">•</span>
                        <span>{evaluation.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < evaluation.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm font-medium">
                          {evaluation.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Evaluations
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Be objective and fair in your assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Provide specific examples to support your ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Focus on both strengths and areas for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Make actionable recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Consider the project context and constraints</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const qualityCategories = [
  {
    id: 1,
    label: "Overall Quality of Work",
  },
  {
    id: 2,
    label: "Adherence to Specifications",
  },
  {
    id: 3,
    label: "Timeliness of Delivery",
  },
  {
    id: 4,
    label: "Communication and Responsiveness",
  },
  {
    id: 5,
    label: "Problem-Solving Ability",
  },
];

const recentEvaluations = [
  {
    id: 1,
    project: "CRYSTAL BUSINESS Tower",
    reviewer: "Eyob Tesfaye",
    date: "Mar 10, 2024",
    rating: 4,
  },
  {
    id: 2,
    project: "Kings Tower Apartments Phase 1",
    reviewer: "Andargachew Mekonen",
    date: "Mar 05, 2024",
    rating: 5,
  },
  {
    id: 3,
    project: "CHAKA Housing Project Block A",
    reviewer: "Selam Bekele",
    date: "Feb 28, 2024",
    rating: 3,
  },
];
