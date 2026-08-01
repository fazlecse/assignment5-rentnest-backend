const PropertiesSkeleton = () => {
  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl bg-muted" />
      ))}
    </div>
  );
};

export default PropertiesSkeleton;
