import { Form, Modal } from "antd";
import { announcement } from "../../config";
import { FeildType } from "../../types";
import BaseInput from "../shared/BaseInput";
import AuthButton from "./AuthButton";
import { useRequest } from "../../hooks/useRequest";
import { announcementUrl } from "../../repositories";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setData?: any;
};

function AnnouncementModal({ isModalOpen, handleCancel, setData }: Props) {
  const { execute, loading: createLoading } = useRequest(
    announcementUrl.url,
    "POST",
    { type: "delay" }
  );
  // const { execute: updateFaq, loading: updateLoading } = useRequest(
  //   announcementUrl.url,
  //   "PATCH",
  //   { type: "delay", routeParams: String(record?.id) }
  // );

  const onFinish = (values: any) => {
    // const action = record ? updateFaq : createFaq;
    // action({
    //   body: values,
    //   // ✅ dynamic
    //   cbSuccess: (res) => {
    //     setData((prev) => updateState(prev, res.data, !!record));
    //     onCancel();
    //   },
    // });

    execute({
      body: values,
      cbSuccess: (res) => {
        handleCancel();
        setData((prev: any) => [res?.data, ...prev]);
      },
    });
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[35px] bold text-center my-8">Add Announcement</p>
      <Form onFinish={onFinish} layout="vertical">
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
        <AuthButton
          htmlType="submit"
          text={"Add Announcement"}
          loading={createLoading}
        />
      </Form>
    </Modal>
  );
}

export default AnnouncementModal;
