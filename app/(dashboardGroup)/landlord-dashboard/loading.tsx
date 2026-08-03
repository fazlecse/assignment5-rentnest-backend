import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const LandlordDashboardLoading = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="space-y-2 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandlordDashboardLoading;
