import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import BaseInput from "../../component/shared/BaseInput";
import { loginFields } from "../../config/index";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../component/shared/AuthLayout";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<"parent" | "teacher">("parent");

  console.log(login);

  return (
    <AuthLayout path="/signup" role={role} setRole={setRole}>
      <Form
        layout="vertical"
        // onFinish={(values: { email: string; password: string }) => {
        //   login(values);
        // }}
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
        <AuthButton text={"Sign in"} onClick={() => navigate("/home")} />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(Login, RouteTypes.AUTH);
