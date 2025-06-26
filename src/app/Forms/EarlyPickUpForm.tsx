import HomeLayout from "../../component/shared/HomeLayout";
import { Form } from "antd";
import { FeildType } from "../../types";
import { earlyPickupForm } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";

function EarlyPickUpForm() {
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">
          Early Pick-up Request Form
        </p>
        <Form layout="vertical" className="mt-5 ">
          <div className="grid lg:grid-cols-2 gap-5 form-m">
            {earlyPickupForm.map((item: FeildType) => {
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
          <div className="flex justify-center w-[100%] mt-10">
            <CustomButton
              className="w-[300px] h-[50px] text-[18px]"
              title="Submit"
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default EarlyPickUpForm;
