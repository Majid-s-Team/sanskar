import { Form, Modal } from "antd";
import { useAuth, useRequest } from "../../hooks";
import { Student } from "../../types";
import { user } from "../../repositories";
import { useEffect, useState } from "react";
import BaseInput from "./BaseInput";
import AuthButton from "../partial/AuthButton";

function StudentDetailsModal3({ open, onClose }: any) {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const { user: userData } = useAuth();
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
            (item: any) => item.is_new_student === false
          );
          setAllStudents(filteredData);
        },
      });
    }
  }, [userData]);

  const onFinish = (values: any) => {
    console.log(values, "values");
  };

  return (
    <Modal
      open={open}
      onCancel={allStudents.length === 0 && onClose}
      footer={null}
      title="View Details"
      centered
      className="white-modal"
      width={600}
      loading={loading}
    >
      <Form layout="vertical" className="mt-5 " onFinish={onFinish}>
        {/* Use Form.List to dynamically render each student's fields */}
        <Form.List name="students">
          {() => (
            <>
              {allStudents?.map((item: Student, index: number) => (
                <div
                  key={item.id}
                  className="grid lg:grid-cols-2 gap-5 mt-10 w-full px-10 border-b pb-10"
                >
                  <p className="text-[18px] medium capitalize">
                    {item.first_name + " " + item.last_name}
                  </p>
                  <div>
                    <Form.Item
                      className="hidden"
                      name={[index, "student_id"]}
                      initialValue={item.id}
                    >
                      <input type="hidden" value={item.id} />
                    </Form.Item>
                    <Form.Item
                      label="Is New Student?"
                      name={[index, "is_new_student"]}
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
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </>
          )}
        </Form.List>

        <AuthButton text="Submit" htmlType="submit" />
      </Form>
    </Modal>
  );
}

export default StudentDetailsModal3;
