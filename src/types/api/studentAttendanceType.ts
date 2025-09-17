export interface AttendanceData {
  teacher_id: number;
  filters: {
    date: string;
  };
  counts: {
    total_students: number;
    present: number;
    excused_absence: number;
    unexcused_absence: number;
    not_recorded: number;
  };
  arrays?: {
    all: Array<StudentAttendance>;
    recorded: Array<StudentAttendance>;
    not_recorded: Array<StudentAttendance>;
  };
}

interface StudentAttendance {
  student_id: number;
  student_name: string;
  status: string;
  date: string;
  participation_points: number;
  homework_points: number;
}
