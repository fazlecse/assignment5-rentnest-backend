import Link from "next/link";
import { Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getCategories } from "../_action/getCategoriesAction";
import type { Category } from "@/lib/types";

const CategoryPage = async () => {
  const result = await getCategories();
  const categories: Category[] = result?.success ? result.data : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold">Browse by Category</h1>
        <p className="text-sm text-muted-foreground">
          Find properties by type
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">No categories available</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/properties?categoryId=${category.id}`}>
              <Card className="flex items-center gap-3 p-4 transition-shadow hover:shadow-md">
                <Tag className="size-4 text-primary" />
                <span className="font-medium">{category.name}</span>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
