"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLandlordRequests } from "@/app/service/getLandlordRequests";
import { updateRequestStatusAction } from "../_actions/requestAction";
import type { RentalRequest, RentalStatus } from "@/lib/types";

const statusStyles: Record<RentalStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

const REQUESTS_QUERY_KEY = ["landlord-requests"];

const RequestsTable = ({
  initialRequests,
}: {
  initialRequests: RentalRequest[];
}) => {
  const queryClient = useQueryClient();

  const { data: requests = [] } = useQuery({
    queryKey: REQUESTS_QUERY_KEY,
    queryFn: async () => {
      const result = await getLandlordRequests();
      return result?.success ? ((result.data as RentalRequest[]) ?? []) : [];
    },
    initialData: initialRequests,
  });

  const mutation = useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: "APPROVED" | "REJECTED";
    }) => updateRequestStatusAction(requestId, status),

    onMutate: async ({ requestId, status }) => {
      await queryClient.cancelQueries({ queryKey: REQUESTS_QUERY_KEY });
      const previous =
        queryClient.getQueryData<RentalRequest[]>(REQUESTS_QUERY_KEY);

      queryClient.setQueryData<RentalRequest[]>(REQUESTS_QUERY_KEY, (old) =>
        (old ?? []).map((request) =>
          request.id === requestId ? { ...request, status } : request,
        ),
      );

      return { previous };
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(REQUESTS_QUERY_KEY, context.previous);
      }
      toast.error("Failed to update request");
    },

    onSuccess: (result, { status }) => {
      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(`Request ${status.toLowerCase()}`);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY });
    },
  });

  const hasPendingRequests = requests.some(
    (request) => request.status === "PENDING",
  );
  const columnCount = hasPendingRequests ? 6 : 5;

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-2">Property</th>
            <th className="px-4 py-2">Tenant</th>
            <th className="px-4 py-2">Move-in</th>
            <th className="px-4 py-2">Months</th>
            <th className="px-4 py-2">Status</th>
            {hasPendingRequests && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td
                colSpan={columnCount}
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
                {hasPendingRequests && (
                  <td className="px-4 py-3">
                    {request.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          disabled={mutation.isPending}
                          onClick={() =>
                            mutation.mutate({
                              requestId: request.id,
                              status: "APPROVED",
                            })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={mutation.isPending}
                          onClick={() =>
                            mutation.mutate({
                              requestId: request.id,
                              status: "REJECTED",
                            })
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default RequestsTable;
