export const studentAttendanceColumns = (handleDetails: any) => {
  return [
    {
      title: "Name",
      dataIndex: "student",
      render: (text: any) => (
        <p className="capitalize">{text?.first_name + " " + text?.last_name}</p>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "student",
      render: (text: any) => <p className="capitalize">{text?.id}</p>,
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
    {
      title: "Participation Points",
      dataIndex: "participation_points",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Homework Points",
      dataIndex: "homework_points",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Contact Info",
      dataIndex: "contact_info",
      render: (_: any, record: any) => (
        <p
          onClick={() => handleDetails(record.student)}
          className="text-[#48B3FF] underline text-[14px] semibold cursor-pointer"
        >
          View Details
        </p>
      ),
    },
  ];
};

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
    status: "Not Recorded",
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
