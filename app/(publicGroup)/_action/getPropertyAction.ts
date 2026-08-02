export const getProperty = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  if (query && query.categoryId) {
    params.set("categoryId", query.categoryId as string);
  }
  if (query && query.city) {
    params.set("city", query.city as string);
  }
  if (query && query.minRent) {
    params.set("minRent", query.minRent as string);
  }
  if (query && query.maxRent) {
    params.set("maxRent", query.maxRent as string);
  }
  if (query && query.bedrooms) {
    params.set("bedrooms", query.bedrooms as string);
  }
  if (query && query.bathrooms) {
    params.set("bathrooms", query.bathrooms as string);
  }
  if (query && query.sortBy) {
    params.set("sortBy", query.sortBy as string);
  }
  if (query && query.sortOrder) {
    params.set("sortOrder", query.sortOrder as string);
  }
  if (query && query.limit) {
    params.set("limit", query.limit as string);
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["property-list"],
      },
    },
  );
  const result = await res.json();
  return result;
};

export const getPropertyById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 6,
      tags: [`property-${id}`],
    },
  });
  const result = await res.json();
  return result;
};
