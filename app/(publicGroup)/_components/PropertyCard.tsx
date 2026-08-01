import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Property } from "@/lib/types";

const statusStyles: Record<Property["status"], string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  RENTED: "bg-yellow-100 text-yellow-700",
  UNAVAILABLE: "bg-red-100 text-red-700",
};

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden p-0 transition-shadow hover:shadow-md">
        <div className="relative h-48 w-full bg-muted">
          {property.thumbnail ? (
            <Image
              src={property.thumbnail}
              alt={property.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
          <span
            className={`absolute top-2 right-2 rounded-full px-2 py-1 text-xs font-medium ${statusStyles[property.status]}`}
          >
            {property.status}
          </span>
        </div>

        <div className="space-y-2 p-4">
          <h3 className="truncate text-lg font-semibold">{property.title}</h3>

          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span className="truncate">
              {property.address}, {property.city}
            </span>
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BedDouble className="size-4" />
              {property.bedrooms} Bed
            </span>
            <span className="flex items-center gap-1">
              <Bath className="size-4" />
              {property.bathrooms} Bath
            </span>
            {property.category && (
              <span className="truncate">{property.category.name}</span>
            )}
          </div>

          <p className="text-primary text-base font-bold">
            ৳{property.rent.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / month
            </span>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default PropertyCard;
