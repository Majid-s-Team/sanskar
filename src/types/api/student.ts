export type Student = {
  is_new_student: any;
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  any_allergies: string;
  created_at: string;
  deleted_at: string | null;
  gurukal: {
    id: number;
    name: string;
    is_active: number;
    created_at: string | null;
    updated_at: string | null;
  };
  gurukal_id: number;
  hobbies_interest: string;
  is_school_year_around: number;
  join_the_club: number;
  last_year_class: string | null;
  profile_image: string | null;
  school_grade: {
    id: number;
    name: string;
    is_active: number;
  };
  school_grade_id: number;
  school_name: string;
  student_email: string;
  student_mobile_number: string;
  teeshirt_size: {
    id: number;
    name: string;
    is_active: number;
  };
  teeshirt_size_id: number;
  updated_at: string;
  is_payment_done: number;
  house: any;
  ai_key: string | null;
  ai_role: string | null;
};
