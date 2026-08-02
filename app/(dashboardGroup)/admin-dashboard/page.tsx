import { Card } from "@/components/ui/card";
import { getAdminUsers } from "@/app/service/getAdminUsers";
import { getAdminProperties } from "@/app/service/getAdminProperties";
import { getAdminRentals } from "@/app/service/getAdminRentals";

const AdminDashboardPage = async () => {
  const [usersResult, propertiesResult, pendingRentalsResult] =
    await Promise.all([
      getAdminUsers({ limit: "1" }),
      getAdminProperties({ limit: "1" }),
      getAdminRentals({ status: "PENDING", limit: "1" }),
    ]);

  const totalUsers = usersResult?.success ? (usersResult.meta?.total ?? 0) : 0;
  const totalProperties = propertiesResult?.success
    ? (propertiesResult.meta?.total ?? 0)
    : 0;
  const pendingRequests = pendingRentalsResult?.success
    ? (pendingRentalsResult.meta?.total ?? 0)
    : 0;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Platform-wide overview
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <p className="text-2xl font-bold">{totalProperties}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Pending Requests</p>
          <p className="text-2xl font-bold">{pendingRequests}</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
