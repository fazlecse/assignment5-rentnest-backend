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
  createdAt: string;
  updatedAt: string;
}
