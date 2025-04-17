import Link from "next/link";
import { Calendar, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  name: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
}

export default function ProjectCard({
  id = "1",
  name = "New Office Building",
  client = "Acme Corporation",
  location = "Downtown, New York",
  startDate = "2023-06-15",
  endDate = "2024-08-30",
  imageUrl = "/placeholder.svg?height=200&width=400",
}: ProjectCardProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link
      href={`/project/${id}`}
      className="block transition-all hover:shadow-md"
    >
      <Card className="h-full overflow-hidden border-slate-200 hover:border-slate-300">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="bg-slate-50 pb-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-6">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <User className="h-4 w-4 mr-2 text-slate-400" />
              <span>{client}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-slate-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
              <span>
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
