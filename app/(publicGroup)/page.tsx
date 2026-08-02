import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import FeaturedProperties from "./_components/FeaturedProperties";
import PropertiesSkeleton from "./_components/PropertiesSkeleton";

function HomePage() {
  return (
    <div>
      <section className="bg-muted/40 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Find & List Rental Properties with Ease
          </h1>
          <p className="text-lg text-muted-foreground">
            RentNest connects tenants with landlords through a simple,
            transparent rental process — browse listings, request to rent,
            and pay securely, all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button nativeButton={false} render={<Link href="/properties" />}>
              Browse Properties
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/register" />}
            >
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Properties</h2>
          <Link
            href="/properties"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <Suspense fallback={<PropertiesSkeleton />}>
          <FeaturedProperties />
        </Suspense>
      </section>
    </div>
  );
}

export default HomePage;
