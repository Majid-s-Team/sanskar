import { Modal, Form } from "antd";
import { changePassword } from "../../config";
import BaseInput from "../shared/BaseInput";
import AuthButton from "./AuthButton";
import { useRequest } from "../../hooks/useRequest";
import { changePassword as Change } from "../../repositories";
import { FeildType } from "../../types";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function ChangePasswordModal({ isModalOpen, handleCancel }: Props) {
  const [form] = Form.useForm();
  const { execute } = useRequest(Change.url, Change.method, {
    type: "delay",
  });

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      title="Change Password"
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(e) =>
          execute({
            body: { ...e },
            cbSuccess: () => {
              handleCancel();
            },
          })
        }
      >
        {changePassword.map((item: FeildType) => {
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
          <BaseInput type="password" />
        </Form.Item>
        <Form.Item
          label={"Confirm password"}
          dependencies={["newPassword"]}
          name={"confirm_password"}
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
          <BaseInput type="password" />
        </Form.Item>
        <AuthButton htmlType="submit" text={"Change Password"} />
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
