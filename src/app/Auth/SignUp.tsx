import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import BaseInput from "../../component/shared/BaseInput";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../component/shared/AuthLayout";
import { useState } from "react";
import { signUpFields } from "../../config/form/signUp";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { login } = useAuth();
  const [role, setRole] = useState<"parent" | "teacher">("parent");

  console.log(login);

  return (
    <AuthLayout path="/login" role={role} setRole={setRole}>
      <Form form={form} layout="vertical">
        <div className="h-[500px] overflow-y-scroll hide-scrollbar">
          {signUpFields.map((item: FeildType) => {
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
          <Form.Item
            label={"Enter your Password"}
            name={"password"}
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
            name={"confirm_password"}
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
            name={"menever_of_hsnc"}
            rules={[{ required: true, message: "Please input your HSNC!" }]}
          >
            <BaseInput type="text" placeholder="HSNC" />
          </Form.Item>
        </div>

        <AuthButton
          onClick={() => navigate("/signup/add-student")}
          text={"Next"}
        />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(SignUp, RouteTypes.AUTH);
