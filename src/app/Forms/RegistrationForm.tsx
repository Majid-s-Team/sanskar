import { Avatar, Form } from "antd";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import { registrationForm, step4 } from "../../config";
import { FeildType } from "../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ActivityList } from "../../component/partial/ActivityList";

type Options = {
  label: string;
  value: string;
};

function RegistrationForm() {
  const [fatherActivity, setFatherActivity] = useState<Options[]>([]);
  const [motherActivity, setMotherActivity] = useState<Options[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
  };

  const onUnSelect = (item: string, isFather: boolean) => {
    const updatedActivities = isFather
      ? fatherActivity.filter((i) => i.value !== item)
      : motherActivity.filter((i) => i.value !== item);
    if (isFather) {
      setFatherActivity(updatedActivities);
      form.setFieldValue("father_activities", updatedActivities);
    } else {
      setMotherActivity(updatedActivities);
      form.setFieldValue("mother_activities", updatedActivities);
    }
  };

  const handleActivityChange = (val: Options[], name: string) => {
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
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">Re-Registration Form</p>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-5 "
        >
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
            <div className="space-y-5">
              {step4.map((item) => {
                return (
                  <Form.Item
                    label={item.title}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                  >
                    <BaseInput
                      {...item}
                      onChange={(_: string, val: Options[]) => {
                        handleActivityChange(val, item.name);
                      }}
                    />
                  </Form.Item>
                );
              })}
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
