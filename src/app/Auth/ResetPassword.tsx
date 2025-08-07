import { Form, Input } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { useAuth } from "../../hooks/useAuth";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";
import { Link, useParams } from "react-router-dom";
function ResetPassword() {
  const { email } = useParams();
  const { resetpassowrd, loading } = useAuth();
  const [form] = Form.useForm();

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-2 "
    >
      <div className="p-10">
        <Link to="/login">
          <img className="w-[150px] mb-10" src="/images/logo.png" alt="" />
        </Link>
        <div className="flex justify-center items-center w-full h-full">
          <img
            className="w-[571px] lg:mt-[-100px]"
            src="/images/forget-pass-img.png"
            alt=""
          />
        </div>
      </div>
      <div className="lg:m-[30px] py-[30px] px-4 flex items-center justify-center">
        <div className="bg-white !w-full p-[30px] rounded-[40px] max-w-[500px] mx-auto shadow-lg">
          <div className="my-[20px] text-center">
            <p className="text-[40px] text-black medium">Reset Password</p>
          </div>
          <Form
            layout="vertical"
            form={form}
            onFinish={(values: {
              password: string;
              confirm_password: string;
            }) => {
              resetpassowrd(values, email as string);
            }}
          >
            <Form.Item
              label={"New password"}
              name={"password"}
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
              name={"password_confirmation"}
              dependencies={["password"]}
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
              <Input.Password className="!rounded-[10px] h-[44px] w-[100%]" />
            </Form.Item>
            <AuthButton loading={loading} text={"Done"} htmlType="submit" />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withAuthGuard(ResetPassword, RouteTypes.AUTH);
