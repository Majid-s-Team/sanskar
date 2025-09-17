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
          status: record?.status ?? "not_recorded",
          participation_points: record?.participation_points ?? 0,
          homework_points: record?.homework_points ?? 0,
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
      dataIndex: "student_name",
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
          selectedStatus[record?.student_id] ||
          record?.status ||
          "not_recorded";

        return (
          <div className="flex justify-center">
            <select
              value={currentStatus}
              onChange={(e) =>
                handleChange(record?.student_id, e.target.value, record)
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
      dataIndex: "participation_points",
      render: (text: number, record: any) => (
        <InputNumber
          max={3}
          min={0}
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text}
          onChange={(value: any) => {
            if (value > 3 || value < 0) {
              message.error("Value must be 0, 1, 2, or 3");
              return;
            }
            updateAttendance(
              record.student_id,
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
      dataIndex: "homework_points",
      render: (text: number, record: any) => (
        <InputNumber
          max={3}
          min={0}
          onChange={(value: any) => {
            if (value > 3 || value < 0) {
              message.error("Value must be 0, 1, 2, or 3");
              return;
            }
            updateAttendance(
              record.student_id,
              "homework_points",
              value,
              record
            );
          }}
          className="!border !border-gray-100 custom-number-input"
          defaultValue={text}
          controls
        />
      ),
    },
  ];
};
