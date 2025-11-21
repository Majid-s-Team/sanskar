import HomeLayout from "../../component/shared/HomeLayout";
import { Form } from "antd";
import { FeildType, Student } from "../../types";
import { earlyPickupForm, earlyPickupForm2 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { useNavigate } from "react-router-dom";
import SignatureInput from "../../component/shared/SignatureInput";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useEffect, useState } from "react";
import { useAuth, useRequest } from "../../hooks";
import { user } from "../../repositories";
import { optionpPicker } from "../../helper";
import dayjs from "dayjs";

function EarlyPickUpForm() {
  const navigate = useNavigate();
  const [allStudents, setAllStudents] = useState<Student[]>();
  const { user: userData } = useAuth();

  const { execute: execute2, loading: loading2 } = useRequest(
    "/early-pickup",
    "POST",
    {}
  );

  const { execute, loading } = useRequest<Student[]>(user.url, user.method, {});

  useEffect(() => {
    if (userData && userData.user?.id) {
      execute({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          const student = res?.data.filter(
            (item: Student) => item.is_payment_done === 1
          );
          setAllStudents(student);
        },
      });
    }
  }, [userData]);

  const onFinish = (value: any) => {
    // navigate(-1);
    execute2({
      body: {
        ...value,
        dob: dayjs(value.dob).format("YYYY-MM-DD"),
        pickup_time: dayjs(value.pickup_time).format("HH:mm"),
      },
      cbSuccess() {
        navigate(-1);
      },
    });
  };
  return (
    <HomeLayout loading={loading}>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">
          Early Pick-up Request Form
        </p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 ">
          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              {earlyPickupForm.map((item: FeildType) => {
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
                          ? optionpPicker(
                              allStudents as any,
                              "id",
                              "first_name"
                            )
                          : item.options
                      }
                    />
                  </Form.Item>
                );
              })}
              <Form.Item
                label="Parent's Signature"
                name="signature_image"
                rules={[
                  {
                    required: true,
                    message: "Please input your signature!",
                  },
                ]}
              >
                <SignatureInput onChange={(e) => console.log(e)} />
              </Form.Item>
            </div>
            <div>
              {earlyPickupForm2.map((item: FeildType) => {
                return (
                  <Form.Item
                    label={item.title}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                  >
                    <BaseInput {...item} />
                  </Form.Item>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center w-[100%] mt-10">
            <CustomButton
              className="w-[300px] h-[50px] text-[18px]"
              title="Submit"
              loading={loading2}
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(EarlyPickUpForm);
