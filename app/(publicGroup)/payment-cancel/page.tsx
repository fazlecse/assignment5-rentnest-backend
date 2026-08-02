import Link from "next/link";
import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <Card className="w-full space-y-4 p-8">
        <XCircle className="mx-auto size-12 text-destructive" />

        <h1 className="text-xl font-semibold">Payment Cancelled</h1>

        <p className="text-sm text-muted-foreground">
          Your payment was cancelled. No charge was made. You can try again
          anytime from your dashboard.
        </p>

        <Button
          nativeButton={false}
          render={<Link href="/dashboard" />}
          className="w-full"
        >
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default PaymentCancelPage;
