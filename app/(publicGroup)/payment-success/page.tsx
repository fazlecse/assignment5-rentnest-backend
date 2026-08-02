import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMyPayments } from "@/app/service/getMyPayments";
import type { Payment } from "@/lib/types";

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  const { session_id } = await searchParams;

  const paymentsResult = await getMyPayments();
  const payments: Payment[] = paymentsResult?.success
    ? paymentsResult.data
    : [];
  const payment = payments.find((p) => p.stripeSessionId === session_id);

  const isConfirmedPaid = payment?.status === "PAID";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <Card className="w-full space-y-4 p-8">
        {isConfirmedPaid ? (
          <CheckCircle2 className="mx-auto size-12 text-green-600" />
        ) : (
          <Clock className="mx-auto size-12 text-yellow-600" />
        )}

        <h1 className="text-xl font-semibold">
          {isConfirmedPaid ? "Payment Successful" : "Payment Received"}
        </h1>

        <p className="text-sm text-muted-foreground">
          {isConfirmedPaid
            ? `Your payment for "${payment?.rentalRequest?.property?.title}" has been confirmed.`
            : "We're confirming your payment with Stripe. This can take a few seconds — check your dashboard shortly for the updated status."}
        </p>

        {payment && (
          <p className="text-lg font-bold text-primary">
            ৳{payment.amount.toLocaleString()}
          </p>
        )}

        <Button render={<Link href="/dashboard" />} className="w-full">
          Go to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
