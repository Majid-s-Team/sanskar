import { Form, notification } from "antd";
import { step3, step4 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { optionpPicker } from "../../helper";
import { useEffect, useState } from "react";
import { ActivityList } from "../../component/partial/ActivityList";
import { activity, signUp } from "../../repositories";
import { useRequest } from "../../hooks/useRequest";

type Options = {
  label: string;
  value: string;
};

function Step3() {
  const { state } = useLocation();
  const [fatherActivity, setFatherActivity] = useState<Options[]>([]);
  const [motherActivity, setMotherActivity] = useState<Options[]>([]);
  const [fatherActive, setFatherActive] = useState<boolean>(
    state?.father_volunteering ?? true
  );
  const [motherActive, setMotherActive] = useState<boolean>(
    state?.mother_volunteering ?? true
  );

  console.log(state, "state");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: activityData } = useRequest(activity.url, activity.method, {
    type: "mount",
  });

  const { execute, loading } = useRequest(signUp.url, signUp.method, {
    type: "delay",
  });

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
    console.log(val, name, "val");

    if (name === "father_activity_ids") {
      setFatherActivity(val);
      form.setFieldValue(name, val);
    } else if (name === "mother_activity_ids") {
      setMotherActivity(val);
      form.setFieldValue(name, val);
    }
  };

  const onFinish = (e: any) => {
    const data = {
      ...e,
      father_activity_ids: (e.father_activity_ids || []).map((i: any) =>
        typeof i === "object" ? i.value : i
      ),
      mother_activity_ids: (e.mother_activity_ids || []).map((i: any) =>
        typeof i === "object" ? i.value : i
      ),
    };
    execute({
      body: { ...state, ...data },
      cbSuccess: (res: any) => {
        navigate("/payment/" + res?.data?.id);
      },
      cbFailure: (res: any) => {
        Object.keys(res.errors).forEach((key) => {
          notification.error({
            message: "Error",
            description: res.errors[key][0],
          });
        });
        if (
          res?.errors?.primary_email?.[0] ===
            "The primary email has already been taken." ||
          res?.errors?.mobile_number?.[0] ===
            "The mobile number has already been taken."
        ) {
          navigate("/signup", { state: { ...data, ...state } });
        } else {
          notification.error({
            message: "Error",
            description: res.message,
          });
        }
      },
    });
  };

  useEffect(() => {
    if (fatherActive === false) {
      setFatherActivity([]);
      form.resetFields(["father_activity_ids"]); // ✅ correct field name
    }
    if (motherActive === false) {
      setMotherActivity([]);
      form.resetFields(["mother_activity_ids"]); // ✅ correct field name
    }
  }, [fatherActive, motherActive]);

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
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="bg-white lg:p-[40px] p-8 rounded-[40px] mx-auto shadow-lg grid lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <p className="text-[28px] semibold">Address Information</p>
                <div>
                  {step3.map((item) => (
                    <Form.Item
                      label={item.title}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      initialValue={state?.[item.name]}
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
                  {step4.map((item) => (
                    <Form.Item
                      label={item.title}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      initialValue={state?.[item.name]}
                    >
                      <BaseInput
                        {...item}
                        disabled={
                          item.name === "father_activity_ids"
                            ? !fatherActive
                            : item.name === "mother_activity_ids"
                            ? !motherActive
                            : false
                        }
                        options={
                          item.name === "mother_activity_ids"
                            ? optionpPicker(activityData as any[])
                            : item.name === "father_activity_ids"
                            ? optionpPicker(activityData as any[])
                            : item.options
                        }
                        onChange={(value: any, val: any[]) => {
                          if (
                            item.name === "father_activity_ids" ||
                            item.name === "mother_activity_ids"
                          ) {
                            handleActivityChange(val, item.name);
                          } else if (item.name === "father_volunteering") {
                            setFatherActive(value);
                          } else if (item.name === "mother_volunteering") {
                            setMotherActive(value);
                          }
                        }}
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
                  htmlType="submit"
                  loading={loading}
                  onCancel={() =>
                    navigate("/signup/add-student", { state: state })
                  }
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

export default Step3;
