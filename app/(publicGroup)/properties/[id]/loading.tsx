import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const PropertyDetailsLoading = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="h-80 w-full rounded-xl" />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>

          <div className="flex gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="space-y-3 p-5">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-9 w-full" />
          </Card>
          <Card className="space-y-3 p-5">
            <Skeleton className="h-4 w-16" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsLoading;
