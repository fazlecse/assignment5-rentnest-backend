import React, { Suspense } from "react";
import PropertiesSkeleton from "../_components/PropertiesSkeleton";
import PropertyList from "../_components/PropertyList";
import { SearchBar } from "../_components/SearchBar";

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="w-full mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Propertis</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive stories for our subscription
          </p>
        </div>
        <SearchBar />
      </div>
      <Suspense fallback={<PropertiesSkeleton />}>
        <PropertyList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default PropertiesPage;
