import { Form, Modal } from "antd";
import AuthButton from "./AuthButton";
import BaseInput from "../shared/BaseInput";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function WriteReasonModal({ isModalOpen, handleCancel }: Props) {
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[30px] bold text-center my-8">Write A Reason</p>
      <Form layout="vertical">
        <Form.Item
          label={"Reason *"}
          name={"reason"}
          rules={[{ required: true, message: "Please input your reason!" }]}
        >
          <BaseInput type="textarea" />
        </Form.Item>
        <AuthButton htmlType="submit" text={"Submit"} />
      </Form>
    </Modal>
  );
}

export default WriteReasonModal;
