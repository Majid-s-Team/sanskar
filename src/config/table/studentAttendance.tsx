export const studentAttendanceColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Student ID",
    dataIndex: "student_id",
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
  {
    title: "Participation Points",
    dataIndex: "participation",
  },
  {
    title: "Homework Points",
    dataIndex: "homework",
  },
  {
    title: "Contact Info",
    dataIndex: "contact_info",
    render: () => (
      <p className="text-[#48B3FF] underline text-[14px] semibold">
        View Details
      </p>
    ),
  },
];

export const studentAttendanceData = [
  {
    name: "John Doe",
    student_id: "S12345",
    status: "Present",
    participation: 5,
    homework: 8,
    contact_info: "johndoe@example.com",
  },
  {
    name: "Jane Smith",
    student_id: "S67890",
    status: "Absent",
    participation: 3,
    homework: 6,
    contact_info: "janesmith@example.com",
  },
  {
    name: "Bob Johnson",
    student_id: "S34567",
    status: "Late",
    participation: 4,
    homework: 7,
    contact_info: "bobjohnson@example.com",
  },
  {
    name: "Alice Brown",
    student_id: "S90123",
    status: "Present",
    participation: 5,
    homework: 9,
    contact_info: "alicebrown@example.com",
  },
  {
    name: "Mike Davis",
    student_id: "S45678",
    status: "Present",
    participation: 4,
    homework: 8,
    contact_info: "mikedavis@example.com",
  },
];
