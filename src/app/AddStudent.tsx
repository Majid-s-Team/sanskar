import { Form } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { FeildType } from "../types";
import BaseInput from "../component/shared/BaseInput";
import { addStudentForm } from "../config";
import CustomButton from "../component/shared/CustomButton";

function AddStudent() {
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[30px] semibold">Student Information</p>
        <Form layout="vertical" className="mt-5 form-m">
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
            <CustomButton title="Submit" />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default AddStudent;
