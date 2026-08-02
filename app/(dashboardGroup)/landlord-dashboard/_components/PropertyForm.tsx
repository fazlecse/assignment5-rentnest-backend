"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Property } from "@/lib/types";
import type { PropertyActionState } from "../_actions/propertyAction";

const PropertyForm = ({
  action,
  categories,
  defaultValues,
  submitLabel,
}: {
  action: (
    prevState: PropertyActionState,
    formData: FormData,
  ) => Promise<PropertyActionState>;
  categories: Category[];
  defaultValues?: Property;
  submitLabel: string;
}) => {
  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          minLength={5}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          minLength={20}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            defaultValue={defaultValues?.address}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            defaultValue={defaultValues?.city}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="rent">Rent (৳/month)</Label>
          <Input
            id="rent"
            name="rent"
            type="number"
            min={1}
            defaultValue={defaultValues?.rent}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={1}
            defaultValue={defaultValues?.bedrooms}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={1}
            defaultValue={defaultValues?.bathrooms}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={defaultValues?.categoryId ?? ""}
          required
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={defaultValues?.thumbnail ?? ""}
          placeholder="https://..."
        />
      </div>

      {defaultValues && (
        <div className="space-y-1">
          <Label htmlFor="status">Availability</Label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues.status}
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none"
          >
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};

export default PropertyForm;
