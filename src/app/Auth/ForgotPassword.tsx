import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { forgotPasswordFields } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import { useAuth } from "../../hooks/useAuth";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";

function ForgotPassword() {
  const { forgotpassword, loading } = useAuth();

  console.log(loading, forgotpassword, "loading");

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-2 "
    >
      <div className="p-10">
        <img className="w-[150px] mb-10" src="/images/logo.png" alt="" />
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
          <div className="my-[20px]">
            <p className="text-[18px] text-black regular mb-[10px]">
              Forget Password?
            </p>
            <p className="text-[40px] text-black medium">Reset Password</p>
            <p className="text-[14px] text-black regular">
              We will email you a link to reset your password
            </p>
          </div>
          <Form
            layout="vertical"
            // onFinish={(email: { email: string }) => {
            //   forgotpassword(email);
            // }}
          >
            {forgotPasswordFields.map((item: FeildType) => {
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
            <AuthButton loading={loading} htmlType="submit" text={"Submit"} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withAuthGuard(ForgotPassword, RouteTypes.AUTH);
