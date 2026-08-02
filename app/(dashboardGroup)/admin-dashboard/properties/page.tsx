import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getAdminProperties } from "@/app/service/getAdminProperties";
import type { Property, PropertyStatus } from "@/lib/types";

const statusStyles: Record<PropertyStatus, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  RENTED: "bg-yellow-100 text-yellow-700",
  UNAVAILABLE: "bg-red-100 text-red-700",
};

const STATUS_FILTERS: { label: string; value?: PropertyStatus }[] = [
  { label: "All" },
  { label: "Available", value: "AVAILABLE" },
  { label: "Rented", value: "RENTED" },
  { label: "Unavailable", value: "UNAVAILABLE" },
];

const AdminPropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) => {
  const { status, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const result = await getAdminProperties({
    status,
    page: String(currentPage),
    limit: String(limit),
  });

  const properties: Property[] = result?.success ? (result.data ?? []) : [];
  const total = result?.success ? (result.meta?.total ?? 0) : 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Property Moderation</h1>
        <p className="text-sm text-muted-foreground">
          {total} properties across the platform
        </p>
      </div>

      <div className="flex gap-2">
        {STATUS_FILTERS.map((filter) => (
          <Link
            key={filter.label}
            href={filter.value ? `?status=${filter.value}` : "?"}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              status === filter.value || (!status && !filter.value)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Landlord</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Rent</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No properties found
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
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{property.landlord?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {property.landlord?.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{property.city}</td>
                  <td className="px-4 py-3">
                    ৳{property.rent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{property.category?.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[property.status]}`}
                    >
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <Link
            href={`?status=${status ?? ""}&page=${Math.max(1, currentPage - 1)}`}
            className="rounded-md border px-3 py-1 hover:bg-muted"
          >
            Previous
          </Link>
          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`?status=${status ?? ""}&page=${Math.min(totalPages, currentPage + 1)}`}
            className="rounded-md border px-3 py-1 hover:bg-muted"
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;
