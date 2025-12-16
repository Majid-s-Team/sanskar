import { Form, Modal, notification } from "antd";
import AuthButton from "./AuthButton";
import { mediaForm } from "../../config";
import { FeildType } from "../../types";
import BaseInput from "../shared/BaseInput";
import { updateState } from "../../helper";
import { useAuth, useRequest } from "../../hooks";
import { useEffect } from "react";
import DocumentUpload from "../shared/DocumentUpload";
type Props = {
  open: boolean;
  onClose: () => void;
  setRecord?: any;
  setData?: any;
  record?: any;
};

function MediaModal({ open, onClose, setRecord, setData, record }: Props) {
  const { user } = useAuth();
  const [form] = Form.useForm();
  // const [isUploading, setIsUploading] = useState(false);
  // const [file, setFile] = useState<any>(null);
  const { execute: createEevent, loading: createLoading } = useRequest(
    "/multimedia",
    "POST",
    { type: "delay" }
  );

  console.log(record);

  const { execute: updateEevent, loading: updateLoading } = useRequest(
    "/multimedia",
    "PUT",
    { type: "delay", routeParams: String(record?.id) }
  );

  const onFinish = (values: any) => {
    const action = record ? updateEevent : createEevent;
    action({
      body: {
        ...values,
        gurukal_id: user?.teacher?.gurukal_id,
        type: "video",
        url: values.media?.file,
        file_name: values.media?.name,
      },
      cbSuccess: (res) => {
        setData((prev: any) => updateState(prev, res.data, !!record));
        onClose();
        setRecord(null);
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };

  const handleCancel = () => {
    setRecord && setRecord(null);
    onClose();
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
      });
      // setFile({
      //   name: record?.file_name,
      //   file: record?.url,
      // });
    }
  }, [record]);

  return (
    <Modal open={open} onCancel={handleCancel} footer={null} centered>
      <p className="text-[35px] bold text-center my-8">
        {record ? "Update Multimedia" : "Add Multimedia"}
      </p>
      <Form form={form} onFinish={onFinish} layout="vertical">
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

        <Form.Item
          label="File"
          name={"media"}
          rules={[
            {
              required: true,
              message: "Please select a file",
            },
          ]}
        >
          <DocumentUpload title="+ Upload" />
        </Form.Item>

        <AuthButton
          htmlType="submit"
          text={record ? "Update Media" : "Add Media"}
          loading={createLoading || updateLoading}
          // disabled={isUploading}
        />
      </Form>
    </Modal>
  );
}

export default MediaModal;
