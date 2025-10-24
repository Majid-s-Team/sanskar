// import { useState } from "react";

import dayjs from "dayjs";

export const attendanceColumns = (student: any) => {
  return [
    {
      title: "Date",
      dataIndex: "attendance_date",
      render: (text: string) => (
        <p className="w-[100px]">{dayjs(text).format("MM-DD-YYYY")}</p>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "student_id",
      render: () => <p className="capitalize">{student?.id}</p>,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      render: () => (
        <p className="capitalize">
          {student?.first_name + " " + student?.last_name}
        </p>
      ),
    },
    {
      title: "Gurukul Class",
      dataIndex: "class",
      render: () => <p className="capitalize">{student?.gurukal?.name}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any) => {
        return (
          <div className="flex justify-center">
            <p
              className={`text-sm rounded-[30px] block p-1 px-5 ${
                text === "excused_absence"
                  ? "!bg-[#FFF8EF] text-[#D6A54B]"
                  : text === "present"
                  ? "!bg-[#EFFFF1] text-[#4BD670]"
                  : text === "unexcused_absence"
                  ? "!bg-[#FFF4FD] text-[#FF9BA4]"
                  : "!bg-[#EFFDFF] text-[#4BBCD6]"
              }`}
            >
              {text === "present"
                ? "Present"
                : text === "not_recorded"
                ? "Not Recorded"
                : text === "excused_absence"
                ? "Excused Absence"
                : text === "unexcused_absence"
                ? "Unexcused Absence"
                : "Absent"}
            </p>
          </div>
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
