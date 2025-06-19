import { Form } from "antd";
import AuthButton from "../../component/partial/AuthButton";
import { forgotPasswordFields } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import { useAuth } from "../../hooks/useAuth";
import { FeildType, RouteTypes } from "../../types";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import AuthLayout from "../../component/shared/AuthLayout";

function ForgotPassword() {
  const { forgotpassword, loading } = useAuth();
  // const [checked, setChecked] = useState<string>();
  // console.log(checked);

  return (
    <AuthLayout>
      {/* <Radio.Group
        onChange={(e) => setChecked(e.target.value)}
        className="mb-5"
        defaultValue={"email"}
      >
        <Radio className=" text-[16px] red-medium" value="email">
          Email
        </Radio>
        <Radio className=" text-[16px] red-medium" value="phone">
          Phone
        </Radio>
      </Radio.Group> */}
      <Form
        layout="vertical"
        onFinish={(email: { email: string }) => {
          forgotpassword(email);
        }}
      >
        {forgotPasswordFields.map((item: FeildType) => {
          return (
            <Form.Item
              label={item.title}
              key={item.name}
              name={item.name}
              rules={item.rules}
              initialValue={"admin@admin.com"}
            >
              <BaseInput {...item} />
            </Form.Item>
          );
        })}
        <AuthButton loading={loading} htmlType="submit" text={"Verify"} />
      </Form>
    </AuthLayout>
  );
}

export default withAuthGuard(ForgotPassword, RouteTypes.AUTH);
