import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BedDouble, Bath, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPropertyById } from "../../_action/getPropertyAction";
import RequestToRentDialog from "./_components/RequestToRentDialog";
import type { Property } from "@/lib/types";

const statusStyles: Record<Property["status"], string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  RENTED: "bg-yellow-100 text-yellow-700",
  UNAVAILABLE: "bg-red-100 text-red-700",
};

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getPropertyById(id);

  if (!result?.success || !result.data) {
    notFound();
  }

  const property: Property = result.data;

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const role = token
    ? (jwt.decode(token) as JwtPayload | null)?.role
    : undefined;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative h-80 w-full overflow-hidden rounded-xl bg-muted">
        {property.thumbnail ? (
          <Image
            src={property.thumbnail}
            alt={property.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[property.status]}`}
        >
          {property.status}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">{property.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="size-4" />
              {property.address}, {property.city}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1">
              <BedDouble className="size-4" />
              {property.bedrooms} Bedrooms
            </span>
            <span className="flex items-center gap-1">
              <Bath className="size-4" />
              {property.bathrooms} Bathrooms
            </span>
            {property.category && <span>{property.category.name}</span>}
          </div>

          <Separator />

          <div>
            <h2 className="mb-2 font-semibold">Description</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <Separator />

          <div>
            <h2 className="mb-4 font-semibold">
              Reviews ({property.reviews?.length ?? 0})
            </h2>
            {property.reviews && property.reviews.length > 0 ? (
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <Card key={review.id} className="space-y-2 p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={review.tenant?.profileImage ?? undefined} />
                        <AvatarFallback>
                          {review.tenant?.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {review.tenant?.name}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="size-3 fill-current" />
                          {review.rating}/5
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="space-y-4 p-5">
            <p className="text-2xl font-bold text-primary">
              ৳{property.rent.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>

            {!token && (
              <Button render={<Link href="/login" />} className="w-full">
                Login to Request
              </Button>
            )}

            {token && role === "TENANT" && property.status === "AVAILABLE" && (
              <RequestToRentDialog propertyId={property.id} />
            )}

            {token && role === "TENANT" && property.status !== "AVAILABLE" && (
              <Button disabled className="w-full">
                Currently Unavailable
              </Button>
            )}
          </Card>

          {property.landlord && (
            <Card className="space-y-3 p-5">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Listed by
              </h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={property.landlord.profileImage ?? undefined} />
                  <AvatarFallback>
                    {property.landlord.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {property.landlord.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {property.landlord.email}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
