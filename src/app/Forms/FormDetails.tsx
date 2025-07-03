import { useNavigate } from "react-router-dom";
import BaseInput from "../../component/shared/BaseInput";
import HomeLayout from "../../component/shared/HomeLayout";
import { formDetailsForm } from "../../config";
import { FeildType } from "../../types";
import { Button, Form } from "antd";

function FormDetails() {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Form Details</p>
        <Form
          onFinish={() => navigate(-1)}
          layout="vertical"
          className="mt-5 mx-auto lg:w-[60%]"
        >
          {formDetailsForm.map((item: FeildType) => {
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
          <div className="flex lg:flex-row flex-col gap-8 mt-10 justify-center">
            <Button
              htmlType="submit"
              style={{
                boxShadow: "0px 10px 20px 0px #24242440",
              }}
              className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
            >
              Accept
            </Button>
            <Button
              onClick={() => navigate(-1)}
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

export default FormDetails;
