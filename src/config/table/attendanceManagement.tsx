export const attendanceColumns = [
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
    render: (text: string) => (
      <p className="text-white text-[14px] py-1 w-[100px] bg-[#00B69B] text-center rounded-[40px]">
        {text}
      </p>
    ),
  },
];

export const attendanceData = [
  {
    date: "2024-02-20",
    student_id: "S001",
    student_name: "John Doe",
    class: "10A",
    status: "Present",
  },
  {
    date: "2024-02-20",
    student_id: "S002",
    student_name: "Jane Smith",
    class: "10A",
    status: "Absent",
  },
  {
    date: "2024-02-20",
    student_id: "S003",
    student_name: "Bob Johnson",
    class: "10A",
    status: "Present",
  },
  {
    date: "2024-02-20",
    student_id: "S004",
    student_name: "Alice Brown",
    class: "10A",
    status: "Absent",
  },
  {
    date: "2024-02-20",
    student_id: "S005",
    student_name: "Charlie White",
    class: "10A",
    status: "Present",
  },
];
