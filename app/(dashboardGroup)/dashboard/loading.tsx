import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const TableSkeleton = () => (
  <Card className="space-y-3 p-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-full" />
    ))}
  </Card>
);

const DashboardLoading = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="space-y-2 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <TableSkeleton />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <TableSkeleton />
      </div>
    </div>
  );
};

export default DashboardLoading;
