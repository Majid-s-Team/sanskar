import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "../../component/shared/BaseInput";
import HomeLayout from "../../component/shared/HomeLayout";
import { formDetailsForm } from "../../config";
import { FeildType } from "../../types";
import { Button, Form } from "antd";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useRequest } from "../../hooks";
import { useEffect } from "react";
import dayjs from "dayjs";
import { studentAbsentRequests } from "../../repositories";

function FormDetails() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data, loading } = useRequest<any>(studentAbsentRequests.url, "GET", {
    type: "mount",
    params: { id: id },
  });

  const { execute, loading: updateLoading } = useRequest(
    studentAbsentRequests.url,
    "PUT",
    {
      type: "delay",
      routeParams: id + "/status",
    }
  );

  const onFinish = (status: string) => {
    execute({
      body: { status: status },
      cbSuccess: () => {
        navigate("/request-management");
      },
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        from_date: dayjs(data.from_date).isValid() ? dayjs(data.from_date) : "",
        to_date: dayjs(data.to_date).isValid() ? dayjs(data.to_date) : "",
        name: data?.student?.first_name + " " + data?.student?.last_name,
      });
    }
  }, [data]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Form Details</p>
        <Form layout="vertical" className="mt-5 mx-auto lg:w-[60%]" form={form}>
          {formDetailsForm.map((item: FeildType) => {
            return (
              <Form.Item
                label={item.title}
                key={item.name}
                name={item.name}
                rules={item.rules}
              >
                <BaseInput {...item} disabled />
              </Form.Item>
            );
          })}
          <div className="flex lg:flex-row flex-col gap-8 mt-10 justify-center">
            <Button
              // onClick={() => navigate("/request-management", { state: 2 })}
              onClick={() => onFinish("approved")}
              style={{
                boxShadow: "0px 10px 20px 0px #24242440",
              }}
              loading={updateLoading}
              className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
            >
              Accept
            </Button>
            <Button
              // onClick={() => navigate("/request-management", { state: 3 })}
              onClick={() => onFinish("rejected")}
              loading={updateLoading}
              style={{
                boxShadow: "0px 10px 20px 0px #24242440",
              }}
              className="h-[54px] px-20 !bg-[#FF0308] rounded-[10px] !border-none text-[20px] medium !text-white"
            >
              Reject
            </Button>
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(FormDetails);
