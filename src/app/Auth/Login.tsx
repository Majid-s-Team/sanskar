import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import BaseInput from "../../component/shared/BaseInput";
import { loginFields } from "../../config/index";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import AuthLayout from "../../component/shared/AuthLayout";
import { useState } from "react";

function Login() {
  const { login, loading } = useAuth();
  const [role, setRole] = useState<"parent" | "teacher">("parent");

  return (
    <AuthLayout path="/signup" role={role} setRole={setRole}>
      <Form
        layout="vertical"
        onFinish={(values: {
          login: string;
          password: string;
          role: "parent" | "teacher";
        }) => {
          login(values);
        }}
      >
        {loginFields.map((item: FeildType) => {
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

        {role === "parent" && (
          <Link
            to="/forgot-password"
            type="link"
            className="!text-[#4285F4] text-[15px] urbanist-regular"
          >
            Forgot Password?
          </Link>
        )}
        <AuthButton text={"Sign in"} htmlType="submit" loading={loading} />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(Login, RouteTypes.AUTH);
