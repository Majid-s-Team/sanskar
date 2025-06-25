import HomeLayout from "../../component/shared/HomeLayout";
import { Form } from "antd";
import { expenseForm } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { FeildType } from "../../types";
import FileUploader from "../../component/shared/FileUploader";

function ExpenseForm() {
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[40px] text-center semibold">
          Expense Reimbursement Form
        </p>
        <Form layout="vertical" className="mt-5 ">
          <div className="grid lg:grid-cols-2 gap-5 form-m">
            {expenseForm.map((item: FeildType) => {
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
            <div>
              <FileUploader />
            </div>
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

export default ExpenseForm;
