import React, { Suspense } from "react";
import PropertiesSkeleton from "../_components/PropertiesSkeleton";
import PropertyList from "../_components/PropertyList";
import { SearchBar } from "../_components/SearchBar";
import { PropertyFilters } from "../_components/PropertyFilters";
import { getCategories } from "@/app/service/getCategories";
import type { Category } from "@/lib/types";

const PropertyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const categoriesResult = await getCategories();
  const categories: Category[] = categoriesResult?.success
    ? categoriesResult.data
    : [];

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
      <PropertyFilters categories={categories} />
      <Suspense fallback={<PropertiesSkeleton />}>
        <PropertyList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default PropertyPage;
