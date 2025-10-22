import { Link, useParams } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { addStudentForm } from "../config";
import { Avatar, Form, Input, Select } from "antd";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { Student } from "../types";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { user } from "../repositories";

function StudentInfo() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectStudent, setSelectStudent] = useState<any>();
  const [allStudents, setAllStudents] = useState<Student[]>();
  const {
    data: studentData,
    loading,
    execute: studentExecute,
  } = useRequest<Student>("/student", "GET", {
    routeParams: String(id),
  });
  const { user: userData } = useAuth();
  const { execute, loading: studentLoading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  useEffect(() => {
    if (userData?.user?.id && !id) {
      execute({
        type: "mount",
        routeParams: `${userData.user.id}/students`,
        cbSuccess(res) {
          const student = res?.data.filter(
            (item: any) => item.is_payment_done !== null
          );
          setAllStudents(student);
          setSelectStudent(
            res.data?.filter((item: any) => item.is_payment_done === 1)[0]?.id
          );
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    if (selectStudent) {
      studentExecute({
        type: "mount",
        routeParams: String(selectStudent),
      });
    }
  }, [selectStudent]);

  useEffect(() => {
    if (studentData) {
      form.setFieldsValue({
        ...studentData,
        // dob: studentData.dob ? dayjs(studentData.dob) : undefined,
        is_new_student: studentData.is_new_student ? "Yes" : "No",
        is_school_year_around: studentData.is_school_year_around ? "Yes" : "No",
        teeshirt_size_id: studentData?.teeshirt_size?.name,
        school_grade_id: studentData?.school_grade?.name,
        gurukal_id: studentData?.gurukal?.name,
        join_the_club: studentData.join_the_club ? "Yes" : "No",
        house_id: studentData?.house?.name,
      });
    }
  }, [studentData]);

  return (
    <HomeLayout loading={loading || studentLoading}>
      <div className="bg-white p-8 rounded-[24.59px]">
        <div className="flex justify-between items-center">
          <p className="text-[30px] semibold">Student Information</p>
          <div className="flex items-center gap-5">
            {!id && (
              <Select
                options={allStudents?.map((item: any) => ({
                  value: item.id,
                  label: (
                    <p className="capitalize regular">
                      {item.first_name} {item.last_name}
                    </p>
                  ),
                }))}
                value={selectStudent}
                onChange={(value) => setSelectStudent(value)}
                className=""
                style={{
                  width: "250px",
                }}
              />
            )}
            <Link
              to={
                id
                  ? `/forms/add-student/${id}`
                  : `/forms/add-student/${selectStudent}`
              }
              className="float-right px-8 h-[45px] flex justify-center items-center !bg-[#FF881A] rounded-[10px] !border-none text-[16px] medium !text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
            >
              Edit
            </Link>
          </div>
        </div>
        <Form form={form} layout="vertical" className="mt-5 form-m">
          <Avatar
            size={120}
            src={studentData?.profile_image}
            className="mb-5"
          />
          <div className="grid lg:grid-cols-2 gap-5 ">
            {addStudentForm.map((item) => {
              return (
                <Form.Item
                  label={item.title}
                  key={item.name}
                  name={item.name}
                  rules={item.rules}
                  // initialValue={studentData[item.name]}
                >
                  <Input
                    disabled
                    className="!bg-[#F2F2F2] !border-none !rounded-[10px] h-[50px] !text-[14px] light"
                    {...item}
                  />
                </Form.Item>
              );
            })}
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(StudentInfo);
