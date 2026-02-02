import { Form, Modal, notification } from "antd";
import AuthButton from "./AuthButton";
import BaseInput from "../shared/BaseInput";
import { useAuth, useRequest } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../higherOrder/DataProvider";
import { useState } from "react";
import { Student } from "../../types";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function WriteReasonModal({ isModalOpen, handleCancel }: Props) {
  const { id } = useParams();
  const { user } = useAuth();
  const { student } = useData();
  const [selectedChildren, setSelectedChildren] = useState<Student[]>([]);
  const navigate = useNavigate();
  const { execute, loading } = useRequest("/events", "POST", {
    type: "delay",
  });
  const isUser = user?.user?.role === "user";

  const onFinish = (e: any) => {
    if (selectedChildren.length === 0 && isUser) {
      notification.error({
        message: "Error",
        description: "Please select at least one child.",
      });
      return;
    }

    const payload = {
      user_id: user?.user?.id,
      status: "not_attending",
      ...(isUser && {
        student_ids: selectedChildren?.map((item: any) => item.id),
      }),
    };

    execute({
      body: {
        ...e,
        ...payload,
      },
      routeParams: String(id) + "/rsvp",
      cbSuccess: () => {
        navigate(-1);
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };

  const handleCheckboxChange = (child: any) => {
    const isSelected = selectedChildren.find((c) => c.id === child.id);
    if (isSelected) {
      setSelectedChildren(selectedChildren.filter((c) => c.id !== child.id));
    } else {
      setSelectedChildren([...selectedChildren, child]);
    }
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[30px] bold text-center my-8">Write A Reason</p>
      {isUser && (
        <div className="space-y-4 mb-5">
          <p className="text-[16px] medium">Select Student</p>
          {student?.map((child: Student) => (
            <div
              key={child.id}
              className="flex items-center justify-between mb-4 p-3 bg-[#D57D25] rounded-[14px] custom-shadow2 cursor-pointer"
              onClick={() => handleCheckboxChange(child)}
            >
              <div className="flex items-center">
                <img
                  src={child?.profile_image || "/images/parent.png"}
                  alt={child.first_name + " " + child.last_name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <span className="text-white medium capitalize">
                  {child.first_name + " " + child.last_name}
                </span>
              </div>
              <input
                type="checkbox"
                style={{ borderRadius: "50%" }}
                checked={selectedChildren.some((c) => c.id === child.id)}
                onChange={() => {}} // avoid double firing, checkbox changes handled by parent div
                className="w-5 h-5 !rounded text-orange-500 focus:ring-orange-500 pointer-events-none"
              />
            </div>
          ))}
        </div>
      )}
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
