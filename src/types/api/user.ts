import { Student } from "./student";

type User = {
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
  roles: Role[];
  students?: Student[];
  father_activities?: any[];
  mother_activities?: any[];
};

type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
};

type Attendance = {
  id: number;
  student_id: number;
  teacher_id: number;
  attendance_date: string;
  status: string;
  participation_points: number;
  homework_points: number;
  created_at: string;
  updated_at: string;
};

type Teacher = {
  id: number;
  user_id: number;
  full_name: string;
  phone_number: string;
  gurukal_id: number;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  gurukal: Gurukal;
  attendances: Attendance[];
};

type Gurukal = {
  id: number;
  name: string;
  is_active: number;
  created_at?: string;
  updated_at?: string;
};

export type UserResponse = {
  user?: User;
  roles?: string[];
  token?: string;
  teacher?: Teacher;
};
