export const getProperty = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();
  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }
  console.log(params, "params");
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
