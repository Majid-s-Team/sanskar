import { InputNumber, message } from "antd";
import { useState } from "react";

export const addNewAttendanceColumns = (setAttendance: any) => {
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  const updateAttendance = (
    studentId: string,
    key: string,
    value: any,
    record?: any
  ) => {
    console.log(record, "value");

    setAttendance((prev: any[]) => {
      const exists = prev.find((a) => a.student_id === studentId);

      if (exists) {
        // agar already attendance state me hai -> update karo
        return prev.map((a) =>
          a.student_id === studentId ? { ...a, [key]: value } : a
        );
      }

      // agar attendance state me nahi hai -> table ke record se values lo
      return [
        ...prev,
        {
          student_id: studentId,
          status: record?.attendance?.status ?? "not_recorded",
          participation_points: record?.attendance?.participation_points ?? 0,
          homework_points: record?.attendance?.homework_points ?? 0,
          [key]: value, // jo naya change hua usko overwrite karo
        },
      ];
    });
  };

  const handleChange = (studentId: string, value: string, record: any) => {
    setSelectedStatus((prev) => ({ ...prev, [studentId]: value }));
    updateAttendance(studentId, "status", value, record);
  };

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
      render: (_: any, record: any) => {
        const currentStatus =
          selectedStatus[record?.student?.id] ||
          record?.attendance?.status ||
          "not_recorded";

        return (
          <div className="flex justify-center">
            <select
              value={currentStatus}
              // disabled={record?.attendance?.status !== "not_recorded"}
              onChange={(e) =>
                handleChange(record?.student.id, e.target.value, record)
              }
              className={`text-sm rounded-[30px] block p-1 ${
                currentStatus === "excused_absence"
                  ? "!bg-[#FFF8EF] text-[#D6A54B]"
                  : currentStatus === "present"
                  ? "!bg-[#EFFFF1] text-[#4BD670]"
                  : currentStatus === "unexcused_absence"
                  ? "!bg-[#FFF4FD] text-[#FF9BA4]"
                  : "!bg-[#EFFDFF] text-[#4BBCD6]"
              }`}
            >
              <option value="present">Present</option>
              <option value="excused_absence">Excused Absence</option>
              <option value="not_recorded">Not Recorded</option>
              <option value="unexcused_absence">Unexcused Absence</option>
            </select>
          </div>
        );
      },
    },
    {
      title: "Participation Points",
      dataIndex: "attendance",
      render: (text: any, record: any) => (
        <InputNumber
          max={3}
          min={0}
          // disabled={text?.participation_points !== 0 ? true : false}
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text.participation_points}
          onChange={(value: any) => {
            if (value > 3 || value < 0) {
              message.error("Value must be 0, 1, 2, or 3");
              return;
            }
            updateAttendance(
              record?.student?.id,
              "participation_points",
              value,
              record
            );
          }}
          controls
        />
      ),
    },
    {
      title: "Homework Points",
      dataIndex: "attendance",
      render: (text: any, record: any) => (
        <InputNumber
          max={3}
          min={0}
          // disabled={text?.homework_points !== 0 ? true : false}
          onChange={(value: any) => {
            if (value > 3 || value < 0) {
              message.error("Value must be 0, 1, 2, or 3");
              return;
            }
            updateAttendance(
              record?.student?.id,
              "homework_points",
              value,
              record
            );
          }}
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text.homework_points}
          controls
        />
      ),
    },
  ];
};
