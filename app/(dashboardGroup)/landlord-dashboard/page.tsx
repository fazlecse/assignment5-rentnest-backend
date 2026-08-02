import { Card } from "@/components/ui/card";
import { getMyProperties } from "@/app/service/getMyProperties";
import { getLandlordRequests } from "@/app/service/getLandlordRequests";
import type { Property, RentalRequest } from "@/lib/types";

const LandlordDashboardPage = async () => {
  const [propertiesResult, requestsResult] = await Promise.all([
    getMyProperties(),
    getLandlordRequests(),
  ]);

  const properties: Property[] = propertiesResult?.success
    ? propertiesResult.data ?? []
    : [];
  const requests: RentalRequest[] = requestsResult?.success
    ? requestsResult.data ?? []
    : [];

  const activeRequests = requests.filter((r) =>
    ["PENDING", "APPROVED"].includes(r.status),
  ).length;
  const earnings = requests
    .filter((r) => r.status === "COMPLETED")
    .reduce((sum, r) => sum + (r.property?.rent ?? 0) * r.months, 0);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Landlord Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your properties and rental requests
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <p className="text-2xl font-bold">{properties.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Requests</p>
          <p className="text-2xl font-bold">{activeRequests}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Earnings</p>
          <p className="text-2xl font-bold">৳{earnings.toLocaleString()}</p>
        </Card>
      </div>
    </div>
  );
};

export default LandlordDashboardPage;
