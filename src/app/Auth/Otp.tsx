import { useState } from "react";
import { Form, notification } from "antd";
import { OtpInput } from "reactjs-otp-input";
import AuthButton from "../../component/partial/AuthButton";
import { useAuth } from "../../hooks/useAuth";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { RouteTypes } from "../../types";
import { Link } from "react-router-dom";

function Otp() {
  const [otp, setOtp] = useState<string>("");
  const { loading, otp: verifyCode } = useAuth();
  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  const onFinish = () => {
    if (otp.length < 6) {
      notification.info({
        message: "Invalid Code",
        description: "Code should be 4 digit",
      });
    } else {
      verifyCode({ otp: otp });
    }
    console.log("Success:", otp);
  };
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
            <p className="text-[40px] text-black medium">Verify OTP</p>
            <p className="text-[14px] text-black regular">
              Enter the OTP sent to your email
            </p>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              rules={[{ required: true, message: "Please input your otp!" }]}
            >
              <OtpInput
                inputStyle={{
                  width: "61.6px",
                  height: "61.6px",
                  background: "#E7F1FF",
                  borderRadius: "10.76px",
                }}
                containerStyle={{ justifyContent: "space-evenly", gap: "10px" }}
                focusStyle={{ background: "#fff" }}
                value={otp}
                onChange={handleChange}
                numInputs={6}
              />
            </Form.Item>
            <AuthButton loading={loading} htmlType="submit" text={"Verify"} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default withAuthGuard(Otp, RouteTypes.AUTH);
