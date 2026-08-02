import React from "react";
import { getProperty } from "../_action/getPropertyAction";
import PropertyCard from "./PropertyCard";
import { Property } from "@/lib/types";

const PropertyList = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const result = await getProperty({ query });
  const properties: Property[] = result?.success ? (result.data ?? []) : [];

  if (properties.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No properties found
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
