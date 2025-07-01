import { Form } from "antd";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import HomeLayout from "../../component/shared/HomeLayout";
import {
  projectForm,
  projectForm1,
  projectForm2,
  projectForm3,
} from "../../config";
import { FeildType } from "../../types";
import { useNavigate } from "react-router-dom";

function renderFields(fields: FeildType[]) {
  return fields.map((item) => (
    <Form.Item
      key={item.name}
      label={
        <p>
          {item.title}
          {item.optional && (
            <span className="text-[#666666] text-[12px] regular">
              {" "}
              (Optional)
            </span>
          )}
        </p>
      }
      name={item.name}
      rules={item.rules}
    >
      <BaseInput {...item} />
    </Form.Item>
  ));
}

function ProjectForm() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(-1);
  };
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-10 p-5 lg:py-10 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[40px] text-center semibold">
          Arts and Craft Project Request Form
        </p>

        <Form onFinish={onFinish} layout="vertical" className="mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-4">
            <div>{renderFields(projectForm)}</div>

            <div>
              {renderFields(projectForm1)}
              <div className="lg:grid grid-cols-2 gap-4">
                {renderFields(projectForm2)}
              </div>
              {renderFields(projectForm3)}
            </div>
          </div>

          <div className="flex justify-center w-full mt-10">
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

export default ProjectForm;
