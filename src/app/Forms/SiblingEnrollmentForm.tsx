import { Form } from "antd";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import { siblingEnrollmentForm } from "../../config";
import { FeildType } from "../../types";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";

function SiblingEnrollmentForm() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
  };
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">
          Sibling Enrollment Request Form
        </p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 ">
          <div className="grid lg:grid-cols-2 gap-5 form-m">
            {siblingEnrollmentForm.map((item: FeildType) => {
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
          </div>
          {/* <div className="flex justify-center w-[100%] mt-10"> */}
          <CustomButton
            className="w-full h-[50px] text-[18px] mt-10"
            title="Submit"
          />
          {/* </div> */}
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(SiblingEnrollmentForm);
