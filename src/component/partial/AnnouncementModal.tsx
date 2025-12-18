import { Form, Modal } from "antd";
import { announcement } from "../../config";
import { FeildType } from "../../types";
import BaseInput from "../shared/BaseInput";
import AuthButton from "./AuthButton";
import { useRequest } from "../../hooks/useRequest";
import { announcementUrl } from "../../repositories";
import { updateState } from "../../helper";
import { useEffect } from "react";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setData?: any;
  record?: any;
};

function AnnouncementModal({
  isModalOpen,
  handleCancel,
  setData,
  record,
}: Props) {
  const [form] = Form.useForm();
  const { execute, loading: createLoading } = useRequest(
    announcementUrl.url,
    "POST",
    { type: "delay" }
  );
  const { execute: update, loading: updateLoading } = useRequest(
    announcementUrl.url,
    "PUT",
    { type: "delay", routeParams: String(record?.id) }
  );

  const onFinish = (values: any) => {
    const action = record ? update : execute;
    action({
      body: values,
      // ✅ dynamic
      cbSuccess: (res) => {
        setData((prev: any) => updateState(prev, res.data, !!record));
        handleCancel();
      },
    });

    // execute({
    //   body: values,
    //   cbSuccess: (res) => {
    //     handleCancel();
    //     setData((prev: any) => [res?.data, ...prev]);
    //   },
    // });
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
      });
    }
  }, [record]);

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[35px] bold text-center my-8">
        {record ? "Update Announcement" : "Add Announcement"}
      </p>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
          text={record ? "Update Announcement" : "Add Announcement"}
          loading={createLoading || updateLoading}
        />
      </Form>
    </Modal>
  );
}

export default AnnouncementModal;
