import { Avatar, Form } from "antd";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import { registrationForm, step4 } from "../../config";
import { FeildType } from "../../types";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
  };
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">Re-Registration Form</p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 ">
          <div className="flex flex-col items-center my-5">
            <Avatar size={120} src="/images/teacher.png" />
            <p className="text-[28px] bold">Child 1</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 lg:space-x-10">
            <div>
              {registrationForm.map((item: FeildType) => {
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
            <div>
              {step4.map((item: FeildType) => {
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
              className="lg:w-[300px] w-full h-[50px] text-[18px]"
              title="Submit"
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default RegistrationForm;
