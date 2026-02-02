type UserType = {
  id: number;
  primary_email: string;
  secondary_email?: string;
  mobile_number: string;
  secondary_mobile_number?: string;
  father_name?: string;
  mother_name?: string;
  father_volunteering: number;
  mother_volunteering: number;
  is_hsnc_member: number;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  is_active: number;
  is_payment_done: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  otp?: string;
  otp_expires_at?: string;
  is_otp_verified: number;
  profile_image: string;
  role: string;
};

type GURUKALType = {
  id: number;
  name: string;
  is_active: number;
  created_at?: string;
  updated_at?: string;
};

export type TeachersType = {
  house: any;
  id: number;
  user_id: number;
  full_name: string;
  phone_number: string;
  gurukal_id: number;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  user: UserType;
  gurukal: GURUKALType;
};
