export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";

export interface Category {
  id: string;
  name: string;
}

export interface Landlord {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  tenantId: string;
  tenant?: {
    id: string;
    name: string;
    profileImage?: string | null;
  };
  propertyId: string;
  createdAt: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  thumbnail?: string | null;
  status: PropertyStatus;
  landlordId: string;
  landlord?: Landlord;
  categoryId: string;
  category?: Category;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}
