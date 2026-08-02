"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Property } from "@/lib/types";
import type { PropertyActionState } from "../_actions/propertyAction";

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive">{message}</p> : null;

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

  const errors = state && !state.success ? state.errors : undefined;

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          aria-invalid={!!errors?.title}
        />
        <FieldError message={errors?.title} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          rows={4}
          aria-invalid={!!errors?.description}
        />
        <FieldError message={errors?.description} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            defaultValue={defaultValues?.address}
            aria-invalid={!!errors?.address}
          />
          <FieldError message={errors?.address} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            defaultValue={defaultValues?.city}
            aria-invalid={!!errors?.city}
          />
          <FieldError message={errors?.city} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="rent">Rent (৳/month)</Label>
          <Input
            id="rent"
            name="rent"
            type="number"
            defaultValue={defaultValues?.rent}
            aria-invalid={!!errors?.rent}
          />
          <FieldError message={errors?.rent} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            defaultValue={defaultValues?.bedrooms}
            aria-invalid={!!errors?.bedrooms}
          />
          <FieldError message={errors?.bedrooms} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            defaultValue={defaultValues?.bathrooms}
            aria-invalid={!!errors?.bathrooms}
          />
          <FieldError message={errors?.bathrooms} />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="categoryId">Category</Label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={defaultValues?.categoryId ?? ""}
          aria-invalid={!!errors?.categoryId}
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
        <FieldError message={errors?.categoryId} />
      </div>

      <div className="space-y-1">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={defaultValues?.thumbnail ?? ""}
          placeholder="https://..."
          aria-invalid={!!errors?.thumbnail}
        />
        <FieldError message={errors?.thumbnail} />
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
