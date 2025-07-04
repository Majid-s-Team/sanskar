import { InputNumber } from "antd";
import { useState } from "react";

export const addNewAttendanceColumns = () => {
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  const handleChange = (setudentId: string, value: string) => {
    setSelectedStatus((prev) => ({ ...prev, [setudentId]: value }));
  };

  return [
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
      render: (_: any, record: any) => {
        const currentStatus =
          selectedStatus[record?.student_id] || record?.status;
        return (
          <div className="flex justify-center">
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
          </div>
        );
      },
    },
    {
      title: "Participation Points",
      dataIndex: "participation",
      render: (text: string) => (
        <InputNumber
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text}
          controls
          // onChange={(e) => console.log(e.target.value)}
        />
      ),
    },
    {
      title: "Homework Points",
      dataIndex: "homework",
      render: (text: string) => (
        <InputNumber
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text}
          controls={true}
          // onChange={(e) => console.log(e.target.value)}
        />
      ),
    },
  ];
};

export const addNewAttendanceData = [
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
