import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

type SiteImage = {
  id: number | string;
  title: string;
  category: string;
  imageSrc: string;
  date?: string;
};

type RecentImagesProps = {
  images: SiteImage[];
};

export function RecentImages({ images }: RecentImagesProps) {
  // Format date to be more readable
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {images.map((image) => (
        <Link
          key={image.id}
          href={`/gallery?image=${image.id}`}
          className="flex gap-4 items-center group"
        >
          <div className="relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border">
            <Image
              src={image.imageSrc || "/placeholder.svg"}
              alt={image.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <h4 className="font-medium group-hover:text-primary transition-colors">
              {image.title}
            </h4>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(image.date)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
