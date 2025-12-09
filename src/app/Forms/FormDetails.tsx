import { useNavigate, useParams } from "react-router-dom";
import BaseInput from "../../component/shared/BaseInput";
import HomeLayout from "../../component/shared/HomeLayout";
import { formDetailsForm } from "../../config";
import { FeildType } from "../../types";
import { Button, Form, Popconfirm } from "antd";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useRequest } from "../../hooks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { studentAbsentRequests } from "../../repositories";

function FormDetails() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<
    "approved" | "rejected" | null
  >(null);

  const { data, loading } = useRequest<any>(studentAbsentRequests.url, "GET", {
    type: "mount",
    params: { id },
  });

  const { execute, loading: updateLoading } = useRequest(
    studentAbsentRequests.url,
    "PUT",
    { type: "delay", routeParams: id + "/status" }
  );

  const onFinish = (status: "approved" | "rejected") => {
    setActiveButton(status);
    execute({
      body: { status },
      cbSuccess: () => {
        setActiveButton(null);
        navigate("/request-management");
      },
      cbFailure: () => setActiveButton(null),
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        from_date: dayjs(data.from_date).isValid() ? dayjs(data.from_date) : "",
        to_date: dayjs(data.to_date).isValid() ? dayjs(data.to_date) : "",
        name:
          data.student &&
          data?.student?.first_name + " " + data?.student?.last_name,
      });
    }
  }, [data]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Form Details</p>
        <Form layout="vertical" className="mt-5 mx-auto lg:w-[60%]" form={form}>
          {formDetailsForm.map((item: FeildType) => (
            <Form.Item
              label={item.title}
              key={item.name}
              name={item.name}
              rules={item.rules}
            >
              <BaseInput {...item} disabled />
            </Form.Item>
          ))}
          {data?.status === "pending" && (
            <div className="flex lg:flex-row flex-col gap-8 mt-10 justify-center">
              <Popconfirm
                title="Are you sure you want to approve this request?"
                onConfirm={() => onFinish("approved")}
                okText="Yes"
              >
                <Button
                  loading={updateLoading && activeButton === "approved"}
                  style={{ boxShadow: "0px 10px 20px 0px #24242440" }}
                  className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
                >
                  Accept
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure you want to reject this request?"
                onConfirm={() => onFinish("rejected")}
                okText="Yes"
              >
                <Button
                  loading={updateLoading && activeButton === "rejected"}
                  style={{ boxShadow: "0px 10px 20px 0px #24242440" }}
                  className="h-[54px] px-20 !bg-[#FF0308] rounded-[10px] !border-none text-[20px] medium !text-white"
                >
                  Reject
                </Button>
              </Popconfirm>
            </div>
          )}
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(FormDetails);
