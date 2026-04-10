import HomeLayout from "../../component/shared/HomeLayout";
import { Form, notification } from "antd";
import { expenseForm, itemsForm } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { FeildType } from "../../types";
import FileUploader from "../../component/shared/FileUploader";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useRequest } from "../../hooks";
import dayjs from "dayjs";
import { useState } from "react";

type FileType = {
  file: File;
  url: string;
};

function ExpenseForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [media, setMedia] = useState<FileType[]>([]);

  const { execute, loading } = useRequest("/teacher-requests", "POST", {
    type: "delay",
  });

  const onFinish = (values: any) => {
    execute({
      body: {
        ...values,
        date: dayjs(values.date).format("YYYY-MM-DD"),
        request_type: "fuel",
        receipt_files: media.map((f) => f.url),
      },
      cbSuccess() {
        navigate(-1);
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };

  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20 p-5 lg:py-20 rounded-[24.59px]">
        <p className="text-[40px] text-center semibold">
          Expense Reimbursement Form
        </p>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-5"
          initialValues={{
            items: [{}], // first item show hoga
          }}
        >
          <div className="grid lg:grid-cols-2 gap-5 form-m">
            {/* Expense Fields */}
            {expenseForm.map((item: FeildType) => (
              <Form.Item
                label={item.title}
                key={item.name}
                name={item.name}
                rules={item.rules}
              >
                <BaseInput {...item} />
              </Form.Item>
            ))}

            {/* Dynamic Items */}
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <div className="col-span-2">
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="grid lg:grid-cols-2 gap-5 mb-4 border p-4 rounded-lg"
                    >
                      {itemsForm.map((item: FeildType) => (
                        <Form.Item
                          key={item.name}
                          label={item.title}
                          name={[field.name, item.name]}
                          rules={item.rules}
                        >
                          <BaseInput {...item} />
                        </Form.Item>
                      ))}

                      <CustomButton
                        htmlType="button"
                        className="w-[150px] h-[40px]"
                        title="Remove"
                        onClick={() => remove(field.name)}
                      />
                    </div>
                  ))}

                  <div className="flex gap-4 items-center mt-3">
                    <FileUploader
                      onChange={(val: any) => setMedia(val)}
                      initialFiles={[]}
                    />

                    <CustomButton
                      htmlType="button"
                      className="w-[250px] h-[50px] text-[16px]"
                      title="Add More Items"
                      icon={
                        <img
                          className="w-[20px]"
                          src="/icons/plus-circle.png"
                          alt=""
                        />
                      }
                      onClick={() => add()}
                    />
                  </div>
                </div>
              )}
            </Form.List>
          </div>

          <div className="flex justify-center mt-10">
            <CustomButton
              className="w-[300px] h-[50px] text-[18px]"
              title="Submit"
              htmlType="submit"
              loading={loading}
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(ExpenseForm);
