import Link from "next/link";
import { Property } from "@/types";
import { ImageSlider } from "@/components/listing/image-slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PropertyCard = ({ property }: { property: Property }) => (
  <div className="flex h-[525px] flex-col items-start justify-start overflow-hidden rounded-lg border border-border backdrop-blur-3xl transition hover:border-foreground">
    <div className="min-h-[250px] w-full">
      <ImageSlider imageUrls={property.imageUrls} />
    </div>
    <div className="flex w-full flex-1 flex-col gap-2 p-4">
      <h3 className="w-full truncate text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        {property.title}
      </h3>
      <h5 className="w-full truncate text-base font-medium text-muted-foreground sm:text-lg">
        {property.location}
      </h5>
      <div className="flex items-center justify-start gap-2 sm:gap-4">
        <span className="w-full truncate text-xl font-semibold text-primary sm:text-2xl">
          {property.price.toLocaleString()} ₺
        </span>
        <Badge className="text-sm font-medium sm:text-base">
          {property.roomCount}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-3">
        {property.tags.slice(0, 4).map((tag, tagIndex) => (
          <Badge
            className="text-xs font-medium tracking-wide sm:text-sm"
            variant="outline"
            key={`propertyTag-${property._id}-${tagIndex}`}
          >
            {tag.length > 15 ? `${tag.slice(0, 15)}...` : tag}
          </Badge>
        ))}
      </div>
      <div className="flex-1" />
      <Link href={`/property/${property._id}`} className="w-full">
        <Button
          className="w-full text-base font-semibold"
          size="lg"
          variant="outline"
        >
          Detaylar
        </Button>
      </Link>
    </div>
  </div>
);
