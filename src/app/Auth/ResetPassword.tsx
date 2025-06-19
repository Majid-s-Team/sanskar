import { Form, Input } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { useAuth } from "../../hooks/useAuth";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";
import { useParams } from "react-router-dom";
import AuthLayout from "../../component/shared/AuthLayout";
function ResetPassword() {
  const { reset_password_token } = useParams();
  const { resetpassowrd, loading } = useAuth();
  const [form] = Form.useForm();

  return (
    <AuthLayout>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values: { password: string; confirm_password: string }) => {
          resetpassowrd(values, reset_password_token as string);
        }}
      >
        <Form.Item
          label={"New password"}
          name={"newPassword"}
          rules={[
            { required: true, message: "Please enter your new password!" },
            {
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must include uppercase, lowercase, number, and special character!",
            },
          ]}
        >
          <Input.Password className="!rounded-[10px] h-[44px] w-[100%]" />
        </Form.Item>
        <Form.Item
          label={"Confirm password"}
          name={"confirm_password"}
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            {
              validator: (_, value) => {
                const password = form.getFieldValue("newPassword");
                if (!value || password === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            },
          ]}
        >
          <Input.Password className="!rounded-[10px] h-[44px] w-[100%]" />
        </Form.Item>
        <AuthButton loading={loading} text={"Verify"} htmlType="submit" />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(ResetPassword, RouteTypes.AUTH);
