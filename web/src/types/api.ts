export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'SUPPLIER' | 'ADMIN';

export interface CustomerProfile {
  id: string;
  userId: string;
  address?: string | null;
  pincode?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NeighborhoodInfo {
  id: string;
  name: string;
  slug: string;
  city: string;
  pincode: string;
}

export interface MerchantProfile {
  id: string;
  userId: string;
  shopName: string;
  storeAddress: string;
  pincode: string;
  isVerified: boolean;
  neighborhoodId?: string | null;
  neighborhood?: NeighborhoodInfo | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierProfile {
  id: string;
  userId: string;
  companyName: string;
  contactPerson?: string | null;
  serviceAreaPincodes: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  id: string;
  firebaseUid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profile: MerchantProfile | SupplierProfile | CustomerProfile | null;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}
