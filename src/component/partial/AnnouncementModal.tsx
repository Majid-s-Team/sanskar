import { Form, Modal } from "antd";
import { announcement } from "../../config";
import { FeildType } from "../../types";
import BaseInput from "../shared/BaseInput";
import AuthButton from "./AuthButton";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function AnnouncementModal({ isModalOpen, handleCancel }: Props) {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      //   title="Change Password"
      centered
    >
      <p className="text-[35px] bold text-center my-8">Add Announcement</p>
      <Form layout="vertical">
        {announcement.map((item: FeildType) => {
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
        <AuthButton htmlType="submit" text={"Add Announcement"} />
      </Form>
    </Modal>
  );
}

export default AnnouncementModal;
