import { getCategories } from "@/app/service/getCategories";
import { createPropertyAction } from "../../_actions/propertyAction";
import PropertyForm from "../../_components/PropertyForm";

const NewPropertyPage = async () => {
  const categoriesResult = await getCategories();
  const categories = categoriesResult?.success ? categoriesResult.data : [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Add New Property</h1>
      <PropertyForm
        action={createPropertyAction}
        categories={categories}
        submitLabel="Create Property"
      />
    </div>
  );
};

export default NewPropertyPage;
