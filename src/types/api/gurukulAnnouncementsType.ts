export type GurukulAnnouncementsType = {
  id?: number;
  gurukal_id?: number | null;
  teacher_id?: number | null;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  gurukal?: object | null;
  teacher?: object | null;
};
