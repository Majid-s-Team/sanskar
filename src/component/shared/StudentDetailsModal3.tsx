import { Form, Modal } from "antd";
import { useAuth, useRequest } from "../../hooks";
import { Student } from "../../types";
import { user } from "../../repositories";
import { useEffect, useState } from "react";
import BaseInput from "./BaseInput";

function StudentDetailsModal3({ open, onClose }: any) {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const { user: userData } = useAuth();
  const [form] = Form.useForm();

  const { loading, execute: execute2 } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  useEffect(() => {
    if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
      execute2({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          const filteredData = res?.data?.filter(
            (item: any) => item.is_new_student === null
          );
          setAllStudents(filteredData);
        },
        // cbFailure(error) {
        //   notification.error({
        //     message: "Error",
        //     description: error.message,
        //   });
        // },
      });
    }
  }, [userData]);

  const { execute, loading: loading2 } = useRequest<any>("/student", "POST", {
    type: "delay",
  });

  const handleStudentChange = async (id: number) => {
    try {
      // sirf ek student ke fields validate karo using its id
      const values = await form.validateFields([
        `student_${id}_is_new_student`,
      ]);

      const is_new_student = values[`student_${id}_is_new_student`];

      execute({
        body: { student_id: id, is_new_student },
        routeParams: String(id) + "/status",
        cbSuccess() {
          setAllStudents((prev) => prev.filter((item) => item.id !== id));
          if (allStudents.length === 1) {
            onClose();
          }
        },
      });
    } catch (err) {
      console.log("Validation error:", err);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={allStudents.length === 0 && onClose}
      footer={null}
      title="Student Details"
      centered
      className="white-modal"
      width={600}
      // confirmLoading={loading || loading2}
      loading={loading || loading2}
    >
      <Form form={form} layout="vertical" className="mt-5 ">
        {allStudents?.map((item: Student) => (
          <div
            key={item.id}
            className="grid grid-cols-2 items-center gap-5 w-full border-b py-4"
          >
            <p className="text-[18px] medium capitalize">
              {item.first_name + " " + item.last_name}
            </p>
            <div>
              <Form.Item
                name={`student_${item.id}_is_new_student`}
                label="Is New Student?"
                rules={[
                  {
                    required: true,
                    message: "Please select your new student!",
                  },
                ]}
              >
                <BaseInput
                  type="select"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                  onChange={() => handleStudentChange(item.id)}
                />
              </Form.Item>
            </div>
          </div>
        ))}
      </Form>
    </Modal>
  );
}

export default StudentDetailsModal3;
