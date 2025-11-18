import { GurukalClassType } from "./genernalType";
import { Student } from "./student";

export interface RequestType {
  id: number;
  student_id: number;
  gurukal_id: number;
  from_date: string;
  to_date: string;
  absent_reason: string;
  tardy: boolean;
  status: string;
  created_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  student: Student | null;
  gurukal: GurukalClassType | null;
}
