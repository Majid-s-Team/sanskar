export type WeeklyUpatdesType = {
  id: number;
  teacher_id: number;
  gurukal_id: number;
  date: string;
  week_number: number;
  title: string;
  description: string;
  media: any[]; // Replace `any` with the appropriate type for `media`
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  teacher: Teacher;
  gurukal: Gurukal;
};

type Teacher = {
  id: number;
  primary_email: string;
  secondary_email: string | null;
  mobile_number: string;
  secondary_mobile_number: string | null;
  father_name: string | null;
  mother_name: string | null;
  father_volunteering: number;
  mother_volunteering: number;
  is_hsnc_member: number;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  is_active: number;
  is_payment_done: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  otp: string | null;
  otp_expires_at: string | null;
  is_otp_verified: number;
  profile_image: string;
  role: string;
  ai_role: string | null;
  ai_key: string | null;
};

type Gurukal = {
  id: number;
  name: string;
  is_active: number;
  created_at: string | null;
  updated_at: string | null;
};
