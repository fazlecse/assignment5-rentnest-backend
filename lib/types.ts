import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
export type RentalStatus = "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";

export interface RentalRequest {
  id: string;
  tenantId: string;
  tenant?: {
    id: string;
    name: string;
    email: string;
  };
  propertyId: string;
  property: Property;
  startDate: string;
  months: number;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED";
export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export interface Payment {
  id: string;
  rentalRequestId: string;
  rentalRequest: RentalRequest;
  stripeSessionId?: string | null;
  transactionId?: string | null;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export type NavbarProps = {
  user: IUser;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
