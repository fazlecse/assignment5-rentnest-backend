import { Card } from "@/components/ui/card";
import { getLandlordRequests } from "@/app/service/getLandlordRequests";
import RequestActionButtons from "../_components/RequestActionButtons";
import type { RentalRequest, RentalStatus } from "@/lib/types";

const statusStyles: Record<RentalStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

const LandlordRequestsPage = async () => {
  const result = await getLandlordRequests();
  const requests: RentalRequest[] = result?.success ? (result.data ?? []) : [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Rental Requests</h1>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Move-in</th>
              <th className="px-4 py-2">Months</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No incoming requests yet
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {request.property?.title}
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
                  <td className="px-4 py-3">
                    {request.status === "PENDING" && (
                      <RequestActionButtons requestId={request.id} />
                    )}
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

export default LandlordRequestsPage;
