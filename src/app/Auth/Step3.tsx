import { Form } from "antd";
import { FeildType } from "../../types";
import { step3, step4 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { Link, useNavigate } from "react-router-dom";
import { setStorageData } from "../../helper";
import { useState } from "react";
import { ActivityList } from "../../component/partial/ActivityList";

function Step3() {
  const [fatherActivity, setFatherActivity] = useState<string[]>([]);
  const [motherActivity, setMotherActivity] = useState<string[]>([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const loginAuth = () => {
    navigate("/home");
    setStorageData("role", "parent");
  };

  const onUnSelect = (item: string, isFather: boolean) => {
    const updatedActivities = isFather
      ? fatherActivity.filter((i) => i !== item)
      : motherActivity.filter((i) => i !== item);
    if (isFather) {
      setFatherActivity(updatedActivities);
      form.setFieldValue("father_activities", updatedActivities);
    } else {
      setMotherActivity(updatedActivities);
      form.setFieldValue("mother_activities", updatedActivities);
    }
  };

  const handleActivityChange = (val: string[], name: string) => {
    if (name === "father_activities") {
      setFatherActivity(val);
      form.setFieldValue(name, val);
    } else if (name === "mother_activities") {
      setMotherActivity(val);
      form.setFieldValue(name, val);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-3 col-span-6">
        <Link to="/login">
          <p className="text-white text-[26px] semibold">Sanskar</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>
      <div className="lg:col-span-9 col-span-12 lg:p-10">
        <div className="flex items-center justify-center h-full">
          <Form form={form} layout="vertical">
            <div className="bg-white lg:p-[40px] p-8 rounded-[40px] mx-auto shadow-lg grid lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <p className="text-[28px] semibold">Address Information</p>
                <div>
                  {step3.map((item: FeildType) => (
                    <Form.Item
                      label={item.title}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                    >
                      <BaseInput {...item} />
                    </Form.Item>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[28px] semibold">
                  Parent Volunteering Information
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                  {step4.map((item: FeildType) => (
                    <Form.Item
                      label={item.title}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                    >
                      <BaseInput
                        {...item}
                        onChange={(val: string[]) =>
                          handleActivityChange(val, item.name)
                        }
                      />
                    </Form.Item>
                  ))}
                </div>

                {/* Mother Activities */}
                <ActivityList
                  activityList={motherActivity}
                  onUnSelect={(item) => onUnSelect(item, false)}
                  title="Mother Activities"
                />

                {/* Father Activities */}
                <ActivityList
                  activityList={fatherActivity}
                  onUnSelect={(item) => onUnSelect(item, true)}
                  title="Father Activities"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <div className="lg:w-[450px] w-full">
                <FormButtons
                  onSubmit={loginAuth}
                  onCancel={() => navigate(-1)}
                  title="Sign up"
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

export default Step3;
