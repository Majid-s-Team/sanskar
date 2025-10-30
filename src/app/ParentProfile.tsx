import { Form } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { parentProfile, step3, step4 } from "../config";
import { FeildType } from "../types";
import BaseInput from "../component/shared/BaseInput";
import CustomButton from "../component/shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActivityList } from "../component/partial/ActivityList";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { optionpPicker } from "../helper";
import { useRequest } from "../hooks/useRequest";
import { activity } from "../repositories";
import { UserActionTypes } from "../types/contexts";
import { useUser } from "../hooks/useUser";
import ImagePicker from "../component/partial/ImagePicker";

type Options = {
  label: string;
  value: string;
};

function ParentProfile() {
  const [form] = Form.useForm();
  const [state, dispatch] = useUser();
  const [fatherActivity, setFatherActivity] = useState<Options[]>([]);
  const [motherActivity, setMotherActivity] = useState<Options[]>([]);
  const [fatherActive, setFatherActive] = useState<boolean>(true);
  const [motherActive, setMotherActive] = useState<boolean>(true);
  const navigate = useNavigate();

  console.log(state);

  const { data, loading: profileLoading } = useRequest<any>("/profile", "GET", {
    type: "mount",
  });

  const { data: activityData } = useRequest(activity.url, activity.method, {
    type: "mount",
  });

  const { execute, loading } = useRequest("/profile-update", "POST", {});

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

    setFatherActive(data.father_volunteering);
    setMotherActive(data.mother_volunteering);

    execute({
      body: { ...data },
      type: "mount",
      cbSuccess(res) {
        dispatch({
          type: UserActionTypes.PUT,
          payload: {
            user: {
              ...state?.user,
              ...(res?.data as any), // merge with existing user
            },
          },
        });
        navigate(-1);
      },
    });
  };

  const onUnSelect = (item: string, isFather: boolean) => {
    const updatedActivities = isFather
      ? fatherActivity.filter((i) => i.value !== item)
      : motherActivity.filter((i) => i.value !== item);

    if (isFather) {
      setFatherActivity(updatedActivities);
      form.setFieldValue("father_activity_ids", updatedActivities);
    } else {
      setMotherActivity(updatedActivities);
      form.setFieldValue("mother_activity_ids", updatedActivities);
    }
  };

  const handleActivityChange = (val: Options[], name: string) => {
    if (name === "father_activity_ids") {
      setFatherActivity(val);
      form.setFieldValue(name, val);
    } else if (name === "mother_activity_ids") {
      setMotherActivity(val);
      form.setFieldValue(name, val);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data?.user,
        is_hsnc_member: data?.user?.is_hsnc_member === 1 ? true : false,
        mother_volunteering:
          data?.user?.mother_volunteering === 1 ? true : false,
        father_volunteering:
          data?.user?.father_volunteering === 1 ? true : false,
      });
      setMotherActive(data?.user?.mother_volunteering === 1 ? true : false);
      setFatherActive(data?.user?.father_volunteering === 1 ? true : false);
    }
  }, [data]);

  useEffect(() => {
    if (!fatherActive) {
      setFatherActivity([]);
      form.setFieldValue("father_activity_ids", []);
    }
    if (!motherActive) {
      setMotherActivity([]);
      form.setFieldValue("mother_activity_ids", []);
    }
  }, [fatherActive, motherActive]);

  useEffect(() => {
    // Mother
    if (motherActive && data?.user?.mother_activities?.length) {
      const mappedMother = data?.user?.mother_activities.map((act: any) => ({
        label: act.name,
        value: act.id,
      }));
      setMotherActivity(mappedMother);
      form.setFieldValue(
        "mother_activity_ids",
        mappedMother.map((i: any) => i.value)
      );
    }

    // Father
    if (fatherActive && data?.user?.father_activities?.length) {
      const mappedFather = data?.user?.father_activities.map((act: any) => ({
        label: act.name,
        value: act.id,
      }));
      setFatherActivity(mappedFather);
      form.setFieldValue(
        "father_activity_ids",
        mappedFather.map((i: any) => i.value)
      );
    }
  }, [data, fatherActive, motherActive]);

  return (
    <HomeLayout loading={profileLoading}>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px]">
        <p className="text-[40px] bold">Parent's Profile</p>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-10"
        >
          <Form.Item
            name="profile_image"
            label="Profile Image"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <ImagePicker
              initialImgSrc={data?.user?.profile_image}
              onChange={() => {}}
            />
          </Form.Item>
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              {parentProfile.map((item) => {
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
                    <BaseInput
                      {...item}
                      disabled={
                        item.name === "secondary_email" &&
                        data?.user?.secondary_email !== null
                          ? true
                          : item.disabled
                      }
                    />
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
                  {step4.map((item) => {
                    return (
                      <Form.Item
                        label={item.title}
                        key={item.name}
                        name={item.name}
                        rules={
                          (item.name === "father_activity_ids" &&
                            !fatherActive) ||
                          (item.name === "mother_activity_ids" && !motherActive)
                            ? []
                            : item.rules
                        }
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
            loading={loading}
            htmlType="submit"
            className="w-full h-[50px] text-[18px] mt-10"
            title="Update & Save Changes"
          />
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(ParentProfile);
