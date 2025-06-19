interface Location {
  type: string;
  coordinates: number[];
}

export type UserType = {
  is_admin_approved?: boolean | undefined;
  current_location?: Location;
  rating?: number;
  reviews?: number;
  _id?: string;
  role?: string;
  name?: string;
  email?: string;
  username?: string;
  image_url?: string;
  license?: string;
  mobile_no?: string;
  gender?: string;
  dob?: string;
  online_status?: boolean;
  profile_verified?: boolean;
  payment_active?: boolean;
  email_verified?: boolean;
  mobile_no_verified?: boolean;
  slug?: string;
  created_at?: string;
  id_back?: string;
  id_front?: string;
  address?: string;
};
