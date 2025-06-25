export const teacherAttendanceColumns = [
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
    render: (text: string) => (
      <p className="text-[#4BD670] text-[14px] py-1 w-[100px] bg-[#EFFFF1] text-center rounded-[40px]">
        {text}
      </p>
    ),
  },
];

export const teacherAttendanceData = [
  {
    date: "2023-02-20",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
  {
    date: "2023-02-21",
    shift_time: "13:00 - 17:00",
    class: "Science 202",
    status: "Absent",
  },
  {
    date: "2023-02-22",
    shift_time: "08:00 - 12:00",
    class: "English 303",
    status: "Present",
  },
  {
    date: "2023-02-23",
    shift_time: "13:00 - 17:00",
    class: "History 404",
    status: "Late",
  },
  {
    date: "2023-02-24",
    shift_time: "08:00 - 12:00",
    class: "Math 101",
    status: "Present",
  },
];
