import { getProperty } from "../_action/getPropertyAction";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/lib/types";

const FeaturedProperties = async () => {
  const result = await getProperty({ query: { limit: "6" } });
  const properties: Property[] = result?.success ? (result.data ?? []) : [];

  if (properties.length === 0) {
    return (
      <p className="text-muted-foreground">
        No properties available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default FeaturedProperties;
