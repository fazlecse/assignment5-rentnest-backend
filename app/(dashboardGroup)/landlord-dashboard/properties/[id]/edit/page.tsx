import { notFound } from "next/navigation";
import { getCategories } from "@/app/service/getCategories";
import { getPropertyById } from "@/app/(publicGroup)/_action/getPropertyAction";
import { updatePropertyAction } from "../../../_actions/propertyAction";
import PropertyForm from "../../../_components/PropertyForm";

const EditPropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [propertyResult, categoriesResult] = await Promise.all([
    getPropertyById(id),
    getCategories(),
  ]);

  if (!propertyResult?.success || !propertyResult.data) {
    notFound();
  }

  const boundUpdateAction = updatePropertyAction.bind(null, id);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Edit Property</h1>
      <PropertyForm
        action={boundUpdateAction}
        categories={categoriesResult?.success ? categoriesResult.data : []}
        defaultValues={propertyResult.data}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditPropertyPage;
