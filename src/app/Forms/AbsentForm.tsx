import { absentForm, teacherAbsentForm } from "../../config";
import { Form } from "antd";
import { FeildType } from "../../types";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import { getStorageData } from "../../helper";
import { useNavigate } from "react-router-dom";

function AbsentForm() {
  const naviagte = useNavigate();
  const role = getStorageData("role");

  const onFinish = () => {
    naviagte(-1);
  };
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20 p-5 lg:py-20 lg:mx-20 rounded-[24.59px] flex flex-col justify-center">
        <p
          className={`semibold ${
            role === "parent" ? "text-[30px]" : "text-center text-[40px] "
          }`}
        >
          Absent Request Form
        </p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 ">
          {(role === "parent" ? absentForm : teacherAbsentForm).map(
            (item: FeildType) => {
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
            }
          )}
          <div className="flex justify-center w-[100%]">
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

export default AbsentForm;
