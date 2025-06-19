import { Form } from "antd";
import { FeildType } from "../../types";
import { step3, step4 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { useNavigate } from "react-router-dom";

function Step3() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 p-10"
    >
      <div className="lg:col-span-3">
        <p className="text-white text-[26px] semibold">Sanskar</p>
        <div className="space-y-2 mt-[130px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign in to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>
      <div className="lg:col-span-9 p-10">
        <Form layout="vertical">
          <div className="bg-white p-[40px] rounded-[40px] mx-auto shadow-lg grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-[28px] semibold">Address Information</p>
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
              <p className="text-[28px] semibold">
                Parent Volunteering Information
              </p>
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
          <div className="mt-10 flex justify-end">
            <div className="w-[450px]">
              <FormButtons
                onSubmit={() => navigate("/home")}
                onCancel={() => navigate(-1)}
                title="Sign up"
                title2="Back"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Step3;
