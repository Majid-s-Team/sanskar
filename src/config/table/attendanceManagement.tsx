import { useState } from "react";

export const attendanceColumns = () => {
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
      title: "Student ID",
      dataIndex: "student_id",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
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
          selectedStatus[record.student_id] || record.status;
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

export const attendanceData = [
  {
    date: "12 May 2024",
    student_id: "S001",
    student_name: "John Doe",
    class: "English",
    status: "Present",
  },
  {
    date: "12 May 2024",
    student_id: "S002",
    student_name: "Jane Smith",
    class: "Maths",
    status: "Excused Absence",
  },
  {
    date: "12 May 2024",
    student_id: "S003",
    student_name: "Bob Johnson",
    class: "Physics",
    status: "Unexcused Absence",
  },
  {
    date: "12 May 2024",
    student_id: "S004",
    student_name: "Alice Brown",
    class: "Chemistry",
    status: "Excused Absence",
  },
  {
    date: "12 May 2024",
    student_id: "S005",
    student_name: "Charlie White",
    class: "EVS",
    status: "Present",
  },
];
