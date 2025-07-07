import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { FeildType } from "../../types";
import { step1, step2 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { Link, useNavigate } from "react-router-dom";

function Step2() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-4">
        <Link to="/login">
          <p className="text-white text-[26px] semibold">Sanskar</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
        </div>
      </div>
      <div className="lg:col-span-8 lg:p-10 col-span-12">
        <div className="bg-white lg:p-[10px] p-8 lg:px-[40px] rounded-[40px] mx-auto shadow-lg h-full">
          <div className="flex lg:flex-row flex-col justify-between items-center">
            <p className="text-[28px] semibold">Student Information</p>
            <div className="lg:w-[250px] w-full">
              <AuthButton text="Add More Student" />
            </div>
          </div>

          <Form
            layout="vertical"
            className="grid lg:grid-cols-2 xl:gap-20 lg:gap-10"
          >
            <div>
              {step1.map((item: FeildType) => {
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
            <div className="flex flex-col justify-between">
              <div>
                {step2.map((item: FeildType) => {
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
              <div className="mb-5">
                <FormButtons
                  onSubmit={() => navigate("/signup/address")}
                  onCancel={() => navigate(-1)}
                  title="Next"
                  title2="Back"
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Step2;
