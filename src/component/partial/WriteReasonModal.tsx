import { Form, Modal, notification } from "antd";
import AuthButton from "./AuthButton";
import BaseInput from "../shared/BaseInput";
import { useAuth, useRequest } from "../../hooks";
import { useParams } from "react-router-dom";
import { useData } from "../higherOrder/DataProvider";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function WriteReasonModal({ isModalOpen, handleCancel }: Props) {
  const { id } = useParams();
  const { user } = useAuth();
  const { student } = useData();
  const { execute, loading } = useRequest<any>("/events", "POST", {
    type: "delay",
  });

  const onFinish = (e: any) => {
    const isUser = user?.user?.role === "user";
    const payload = {
      user_id: user?.user?.id,
      status: "not_attending",
      ...(isUser && { student_ids: student?.map((item: any) => item.id) }),
    };
    execute({
      body: {
        ...e,
        ...payload,
      },
      routeParams: String(id) + "/rsvp",
      cbSuccess: () => {
        handleCancel();
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };
  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[30px] bold text-center my-8">Write A Reason</p>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label={"Reason *"}
          name={"note"}
          rules={[{ required: true, message: "Please input your reason!" }]}
        >
          <BaseInput type="textarea" />
        </Form.Item>
        <AuthButton htmlType="submit" text={"Submit"} loading={loading} />
      </Form>
    </Modal>
  );
}

export default WriteReasonModal;
