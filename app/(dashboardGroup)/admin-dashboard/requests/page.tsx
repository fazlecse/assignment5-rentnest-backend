import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getAdminRentals } from "@/app/service/getAdminRentals";
import type { RentalRequest, RentalStatus } from "@/lib/types";

const statusStyles: Record<RentalStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

const STATUS_FILTERS: { label: string; value?: RentalStatus }[] = [
  { label: "All" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Completed", value: "COMPLETED" },
];

const AdminRequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) => {
  const { status, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const result = await getAdminRentals({
    status,
    page: String(currentPage),
    limit: String(limit),
  });

  const requests: RentalRequest[] = result?.success ? (result.data ?? []) : [];
  const total = result?.success ? (result.meta?.total ?? 0) : 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Rental Request Moderation</h1>
        <p className="text-sm text-muted-foreground">
          {total} rental requests across the platform
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
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Move-in</th>
              <th className="px-4 py-2">Months</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No rental requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/properties/${request.propertyId}`}
                      className="font-medium hover:underline"
                    >
                      {request.property?.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{request.tenant?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {request.tenant?.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(request.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{request.months}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[request.status]}`}
                    >
                      {request.status}
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

export default AdminRequestsPage;
