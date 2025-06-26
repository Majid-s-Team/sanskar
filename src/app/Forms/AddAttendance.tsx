import HomeLayout from "../../component/shared/HomeLayout";
import { Form } from "antd";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { addAttendanceForm } from "../../config";
import { FeildType } from "../../types";

function AddAttendance() {
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Add New Attendance</p>
        <Form layout="vertical" className="mt-5 mx-auto lg:w-[60%]">
          {addAttendanceForm.map((item: FeildType) => {
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
          <div className="flex justify-center">
            <CustomButton
              className="lg:w-[300px] w-[100%] h-[50px] text-[18px]"
              title="Add"
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default AddAttendance;
