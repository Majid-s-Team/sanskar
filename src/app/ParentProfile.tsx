import { Form } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { parentProfile, step3, step4 } from "../config";
import { FeildType } from "../types";
import BaseInput from "../component/shared/BaseInput";
import CustomButton from "../component/shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ActivityList } from "../component/partial/ActivityList";

function ParentProfile() {
  const [fatherActivity, setFatherActivity] = useState<string[]>([]);
  const [motherActivity, setMotherActivity] = useState<string[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
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
    <HomeLayout>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px]">
        <p className="text-[40px] bold">Parent's Profile</p>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-10"
        >
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
                        <BaseInput
                          {...item}
                          onChange={(val: string[]) =>
                            handleActivityChange(val, item.name)
                          }
                        />
                      </Form.Item>
                    );
                  })}
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
