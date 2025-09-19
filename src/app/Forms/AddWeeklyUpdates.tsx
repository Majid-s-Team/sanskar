import { Form } from "antd";
import HomeLayout from "../../component/shared/HomeLayout";
import { FeildType } from "../../types";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { addWeeklyUpdates } from "../../config";
import FileUploader from "../../component/shared/FileUploader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useRequest } from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function AddWeeklyUpdates() {
  const { id } = useParams();
  const { state } = useLocation();
  const [form] = Form.useForm();

  const method = id ? "PUT" : "POST";

  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const { execute: execute2, loading } = useRequest(
    "/weekly-updates",
    method,
    {}
  );

  const onFinish = (val: any) => {
    execute2({
      body: { ...val, media, date: dayjs(val.date).format("YYYY-MM-DD") },
      routeParams: id ? String(id) : undefined,
      cbSuccess() {
        navigate("/archived", { state: 1 });
      },
    });
  };

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        ...state,
        date: dayjs(state.date),
      });
      setMedia(state.media || []);
    }
  }, [state]);

  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Add Weekly Updates</p>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-5 mx-auto lg:w-[60%] xl:w-[600px]"
        >
          {addWeeklyUpdates.map((item: FeildType) => {
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
          {/* <Form.Item
            label="Media"
            name="media"
            rules={[{ required: true, message: "Please input your media!" }]}
          > */}
          <FileUploader
            onChange={(val: any) => setMedia(val)}
            initialFiles={state?.media || []}
          />
          {/* </Form.Item> */}
          <div className="flex justify-center mt-10">
            <CustomButton
              className="lg:w-[300px] w-[100%] h-[50px] text-[18px]"
              title={id ? "Save Update" : "Save"}
              htmlType="submit"
              loading={loading}
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AddWeeklyUpdates);
