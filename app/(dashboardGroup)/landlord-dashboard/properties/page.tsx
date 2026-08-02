import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMyProperties } from "@/app/service/getMyProperties";
import DeletePropertyButton from "../_components/DeletePropertyButton";
import type { Property } from "@/lib/types";

const statusStyles: Record<Property["status"], string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  RENTED: "bg-yellow-100 text-yellow-700",
  UNAVAILABLE: "bg-red-100 text-red-700",
};

const LandlordPropertiesPage = async () => {
  const result = await getMyProperties();
  const properties: Property[] = result?.success ? (result.data ?? []) : [];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Properties</h1>
        <Button render={<Link href="/landlord-dashboard/properties/new" />}>
          Add Property
        </Button>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Rent</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No properties yet
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/properties/${property.id}`}
                      className="font-medium hover:underline"
                    >
                      {property.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{property.city}</td>
                  <td className="px-4 py-3">
                    ৳{property.rent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[property.status]}`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        render={
                          <Link
                            href={`/landlord-dashboard/properties/${property.id}/edit`}
                          />
                        }
                      >
                        Edit
                      </Button>
                      <DeletePropertyButton propertyId={property.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default LandlordPropertiesPage;
