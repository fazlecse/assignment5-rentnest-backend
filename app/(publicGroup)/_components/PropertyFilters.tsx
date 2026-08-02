"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import type { Category } from "@/lib/types";

const ROOM_OPTIONS = ["1", "2", "3", "4", "5"];
const FILTER_KEYS = [
  "city",
  "minRent",
  "maxRent",
  "bedrooms",
  "bathrooms",
  "categoryId",
];

export function PropertyFilters({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const updateParamDebounced = (key: string, value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParam(key, value), 500);
  };

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.get(key));

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-lg border p-4">
      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          City
        </label>
        <Input
          defaultValue={searchParams.get("city") ?? ""}
          placeholder="e.g. Dhaka"
          className="h-9 w-28"
          onChange={(e) => updateParamDebounced("city", e.target.value)}
        />
      </div>

      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          Min Rent
        </label>
        <Input
          type="number"
          min={0}
          defaultValue={searchParams.get("minRent") ?? ""}
          className="h-9 w-24"
          onChange={(e) => updateParamDebounced("minRent", e.target.value)}
        />
      </div>

      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          Max Rent
        </label>
        <Input
          type="number"
          min={0}
          defaultValue={searchParams.get("maxRent") ?? ""}
          className="h-9 w-24"
          onChange={(e) => updateParamDebounced("maxRent", e.target.value)}
        />
      </div>

      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          Bedrooms
        </label>
        <select
          defaultValue={searchParams.get("bedrooms") ?? ""}
          onChange={(e) => updateParam("bedrooms", e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-2 text-sm outline-none"
        >
          <option value="">Any</option>
          {ROOM_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          Bathrooms
        </label>
        <select
          defaultValue={searchParams.get("bathrooms") ?? ""}
          onChange={(e) => updateParam("bathrooms", e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-2 text-sm outline-none"
        >
          <option value="">Any</option>
          {ROOM_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1 gap-1 flex items-center">
        <label className="text-xs font-medium text-muted-foreground">
          Category
        </label>
        <select
          defaultValue={searchParams.get("categoryId") ?? ""}
          onChange={(e) => updateParam("categoryId", e.target.value)}
          className="h-9 rounded-md border border-input bg-transparent px-2 text-sm outline-none"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <Link
          href={pathname}
          className="flex h-9 items-center text-sm text-muted-foreground hover:underline"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}
