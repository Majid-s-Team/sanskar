import { useState } from "react";

export const teacherAttendanceColumns = () => {
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  const handleChange = (studentId: string, value: string) => {
    setSelectedStatus((prev) => ({ ...prev, [studentId]: value }));
  };
  return [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Shift Time",
      dataIndex: "shift_time",
    },
    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: any) => {
        const currentStatus =
          selectedStatus[record?.student_id] || record?.status;
        return (
          <select
            value={currentStatus}
            onChange={(e) => handleChange(record.student_id, e.target.value)}
            className={`text-sm rounded-[30px] block p-1 ${
              currentStatus === "Excused Absence"
                ? "!bg-[#FFF8EF] text-[#D6A54B]"
                : currentStatus === "Present"
                ? "!bg-[#EFFFF1] text-[#4BD670]"
                : currentStatus === "Unexcused Absence"
                ? "!bg-[#FFF4FD] text-[#FF9BA4]"
                : " !bg-[#EFFDFF] text-[#4BBCD6]"
            }`}
          >
            <option value="Present">Present</option>
            <option value="Excused Absence">Excused Absence</option>
            <option value="Not Recorded">Not Recorded</option>
            <option value="Unexcused Absence">Unexcused Absence</option>
          </select>
        );
      },
    },
  ];
};

export const teacherAttendanceData = [
  {
    student_id: "T001",
    date: "2023-02-20",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
  {
    student_id: "T002",
    date: "2023-02-21",
    shift_time: "13:00 - 17:00",
    class: "Science 202",
    status: "Absent",
  },
  {
    student_id: "T003",
    date: "2023-02-22",
    shift_time: "08:00 - 12:00",
    class: "English 303",
    status: "Present",
  },
  {
    student_id: "T004",
    date: "2023-02-23",
    shift_time: "13:00 - 17:00",
    class: "History 404",
    status: "Late",
  },
  {
    student_id: "T005",
    date: "2023-02-24",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
];
