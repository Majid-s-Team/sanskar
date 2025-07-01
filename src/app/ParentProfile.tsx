import { Form } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { parentProfile, step3, step4 } from "../config";
import { FeildType } from "../types";
import BaseInput from "../component/shared/BaseInput";
import CustomButton from "../component/shared/CustomButton";
import { useNavigate } from "react-router-dom";

function ParentProfile() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
  };
  return (
    <HomeLayout>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px]">
        <p className="text-[40px] bold">Parent's Profile</p>
        <Form onFinish={onFinish} layout="vertical" className="mt-10">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              {parentProfile.map((item: FeildType) => {
                return (
                  <Form.Item
                    label={
                      <p>
                        {item.title}
                        {item.optional && (
                          <span className="text-[#666666] text-[12px] regular">
                            {" "}
                            (Optional)
                          </span>
                        )}
                      </p>
                    }
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
              <div className="space-y-4">
                <p className="text-[28px] medium">Address Information</p>
                <div>
                  {step3.map((item: FeildType) => {
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

              <div className="space-y-4">
                <p className="text-[28px] medium">Volunteering Information</p>
                <div className="grid gap-4 lg:grid-cols-2">
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
            </div>
          </div>

          <CustomButton
            className="w-full h-[50px] text-[18px] mt-10"
            title="Update & Save Changes"
          />
        </Form>
      </div>
    </HomeLayout>
  );
}

export default ParentProfile;
