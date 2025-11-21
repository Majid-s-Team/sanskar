import dayjs from "dayjs";

export const teacherAttendanceColumns = () => {
  return [
    {
      title: "Date",
      dataIndex: "created_at",
      render: (text: string) => {
        return <div>{dayjs(text).format("MM-DD-YYYY")}</div>;
      },
    },
    {
      title: "Shift Time",
      dataIndex: "shift_time",
    },
    {
      title: "Class",
      dataIndex: "gurukal",
      render: (text: any) => {
        return <div>{text?.name}</div>;
      },
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

export const teacherAttendanceData = [
  {
    student_id: "T001",
    date: "12 May 2024",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
  {
    student_id: "T002",
    date: "12 May 2024",
    shift_time: "13:00 - 17:00",
    class: "Science 202",
    status: "Absent",
  },
  {
    student_id: "T003",
    date: "12 May 2024",
    shift_time: "08:00 - 12:00",
    class: "English 303",
    status: "Present",
  },
  {
    student_id: "T004",
    date: "12 May 2024",
    shift_time: "13:00 - 17:00",
    class: "History 404",
    status: "Late",
  },
  {
    student_id: "T005",
    date: "12 May 2024",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
];
