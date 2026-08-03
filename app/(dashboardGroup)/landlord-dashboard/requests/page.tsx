import { getLandlordRequests } from "@/app/service/getLandlordRequests";
import RequestsTable from "../_components/RequestsTable";
import type { RentalRequest } from "@/lib/types";

const LandlordRequestsPage = async () => {
  const result = await getLandlordRequests();
  const requests: RentalRequest[] = result?.success ? (result.data ?? []) : [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Rental Requests</h1>
      <RequestsTable initialRequests={requests} />
    </div>
  );
};

export default LandlordRequestsPage;
