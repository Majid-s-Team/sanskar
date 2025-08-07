import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import BaseInput from "../../component/shared/BaseInput";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import AuthLayout from "../../component/shared/AuthLayout";
import { useState } from "react";
import { signUpFields } from "../../config/form/signUp";
import { useLocation, useNavigate } from "react-router-dom";

function SignUp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [role, setRole] = useState<"parent" | "teacher">("parent");

  console.log(state, "state");

  const onFinish = (e: any) => {
    if (state === null) {
      navigate("/signup/add-student", { state: e });
    } else {
      navigate("/signup/address", { state: { ...state, ...e } });
    }
  };

  return (
    <AuthLayout path="/login" role={role} setRole={setRole}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="h-[500px] overflow-y-scroll hide-scrollbar">
          {signUpFields.map((item: FeildType) => {
            return (
              <Form.Item
                label={item.title}
                key={item.name}
                name={item.name}
                rules={item.rules}
                initialValue={state?.[item.name]}
              >
                <BaseInput {...item} />
              </Form.Item>
            );
          })}
          <Form.Item
            label={"Enter your Password"}
            name={"password"}
            initialValue={state?.password}
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character!",
              },
            ]}
          >
            <BaseInput placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item
            label={"Confirm password"}
            name={"password_confirmation"}
            initialValue={state?.password_confirmation}
            rules={[
              { required: true, message: "Please confirm your password!" },
              {
                validator: (_, value) => {
                  const password = form.getFieldValue("password");
                  if (!value || password === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              },
            ]}
          >
            <BaseInput type="password" />
          </Form.Item>
          <Form.Item
            label={"Member of HSNC"}
            name={"is_hsnc_member"}
            initialValue={state?.is_hsnc_member}
            rules={[{ required: true, message: "Please input your HSNC!" }]}
          >
            <BaseInput
              type="select"
              options={[
                {
                  label: "Yes",
                  value: true,
                },
                {
                  label: "No",
                  value: false,
                },
              ]}
              placeholder="HSNC"
            />
          </Form.Item>
        </div>
        <AuthButton htmlType="submit" text={"Next"} />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(SignUp, RouteTypes.AUTH);
