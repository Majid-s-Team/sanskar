import { Form } from "antd";
import HomeLayout from "../../component/shared/HomeLayout";
import { addStudentForm } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { FeildType } from "../../types";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    navigate("/home");
  };

  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[30px] semibold">Student Information</p>
        <Form onFinish={onFinish} layout="vertical" className="mt-5 form-m">
          <div className="grid grid-cols-2 gap-5">
            {addStudentForm.map((item: FeildType) => {
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
          <div className="flex justify-end">
            <CustomButton htmlType="submit" title="Submit" />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default AddStudent;
