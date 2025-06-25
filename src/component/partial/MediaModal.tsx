import { Form, Modal } from "antd";
import AuthButton from "./AuthButton";
import { mediaForm } from "../../config";
import { FeildType } from "../../types";
import BaseInput from "../shared/BaseInput";
import FileUploader from "../shared/FileUploader";
type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function MediaModal({ isModalOpen, handleCancel }: Props) {
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[35px] bold text-center my-8">Add Multimedia</p>
      <Form layout="vertical">
        {mediaForm.map((item: FeildType) => {
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
        <FileUploader />
        <AuthButton htmlType="submit" text={"Add Media"} />
      </Form>
    </Modal>
  );
}

export default MediaModal;
