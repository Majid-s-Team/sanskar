import { absentForm, teacherAbsentForm } from "../../config";
import { Form, notification } from "antd";
import { Student } from "../../types";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import { getStorageData, optionpPicker } from "../../helper";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useEffect, useState } from "react";
import { user } from "../../repositories";
import { useAuth, useRequest } from "../../hooks";
import dayjs from "dayjs";

function AbsentForm() {
  const { user: userData } = useAuth();
  const naviagte = useNavigate();
  const role = getStorageData("role");
  const [allStudents, setAllStudents] = useState<Student[]>();
  const { execute: execute2, loading: studentLoading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  const { execute, loading: absentLoading } = useRequest(
    "/absent-requests",
    "POST",
    {
      type: "delay",
    }
  );

  const onFinish = (values: any) => {
    execute({
      body: {
        ...values,
        from_date: dayjs(values.from_date).format("YYYY-MM-DD"),
        to_date: dayjs(values.to_date).format("YYYY-MM-DD"),
      },
      cbSuccess() {
        naviagte(-1);
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
        // if (error?.data) {
        //   // @ts-ignore
        //   // const errorMessages = Object.values(error.data).flat();
        //   // errorMessages.forEach((msg: any) => {
        //   //   notification.error({
        //   //     message: "Error",
        //   //     description: msg,
        //   //   });
        //   // });
        // }
      },
    });
  };

  useEffect(() => {
    if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
      execute2({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          const student = res?.data.filter(
            (item: any) => item.is_payment_done !== null
          );
          setAllStudents(student);
        },
      });
    }
  }, [userData]);

  return (
    <HomeLayout loading={studentLoading}>
      <div className="bg-white xl:px-40 lg:px-20 p-5 lg:py-20 lg:mx-20 rounded-[24.59px] flex flex-col justify-center">
        <p
          className={`semibold ${
            role === "user" ? "text-[30px]" : "text-center text-[40px] "
          }`}
        >
          Absent Request Form
        </p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 ">
          {(role === "user" ? absentForm : teacherAbsentForm).map((item) => {
            return (
              <Form.Item
                label={item.title}
                key={item.name}
                name={item.name}
                rules={item.rules}
              >
                <BaseInput
                  {...item}
                  options={
                    item.name === "student_id"
                      ? optionpPicker(allStudents as any, "id", "first_name")
                      : []
                  }
                />
              </Form.Item>
            );
          })}
          <div className="flex justify-center w-[100%] gap-5 items-center">
            <CustomButton
              className="w-[300px] h-[50px] text-[18px] !bg-red-500 text-black"
              backgroundColor=""
              title="Cancel"
              onClick={() => naviagte(-1)}
            />
            <CustomButton
              loading={absentLoading}
              className="w-[300px] h-[50px] text-[18px]"
              title="Submit"
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AbsentForm);
