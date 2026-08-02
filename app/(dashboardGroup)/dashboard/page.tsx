import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getMyRentals } from "@/app/service/getMyRentals";
import { getMyPayments } from "@/app/service/getMyPayments";
import PayNowButton from "./_components/PayNowButton";
import ReviewDialog from "./_components/ReviewDialog";
import type { RentalRequest, RentalStatus, Payment } from "@/lib/types";

const rentalStatusStyles: Record<RentalStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

const paymentStatusStyles: Record<Payment["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

const UserDashboardPage = async () => {
  const [rentalsResult, paymentsResult] = await Promise.all([
    getMyRentals(),
    getMyPayments(),
  ]);

  const rentals: RentalRequest[] = rentalsResult?.success
    ? rentalsResult.data
    : [];
  const payments: Payment[] = paymentsResult?.success
    ? paymentsResult.data
    : [];

  const activeCount = rentals.filter((r) =>
    ["PENDING", "APPROVED"].includes(r.status),
  ).length;
  const completedCount = rentals.filter(
    (r) => r.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Tenant Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your rental requests and payments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Requests</p>
          <p className="text-2xl font-bold">{rentals.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold">{activeCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{completedCount}</p>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Rental Requests</h2>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Move-in</th>
                <th className="px-4 py-2">Months</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rentals.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No rental requests yet
                  </td>
                </tr>
              ) : (
                rentals.map((rental) => (
                  <tr key={rental.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/properties/${rental.propertyId}`}
                        className="font-medium hover:underline"
                      >
                        {rental.property?.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(rental.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{rental.months}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${rentalStatusStyles[rental.status]}`}
                      >
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {rental.status === "APPROVED" && (
                        <PayNowButton rentalRequestId={rental.id} />
                      )}
                      {rental.status === "COMPLETED" && (
                        <ReviewDialog
                          propertyId={rental.propertyId}
                          propertyTitle={rental.property?.title}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Payment History</h2>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No payments yet
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      {payment.rentalRequest?.property?.title}
                    </td>
                    <td className="px-4 py-3">
                      ৳{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${paymentStatusStyles[payment.status]}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardPage;
