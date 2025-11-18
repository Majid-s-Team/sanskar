import { GurukalClassType } from "./genernalType";

export type AnnouncementType = {
  id: number;
  gurukal_id: number;
  teacher_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  gurukal: GurukalClassType;
};
