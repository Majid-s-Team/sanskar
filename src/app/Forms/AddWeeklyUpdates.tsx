import { Form } from "antd";
import HomeLayout from "../../component/shared/HomeLayout";
import { FeildType } from "../../types";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { addWeeklyUpdates } from "../../config";
import FileUploader from "../../component/shared/FileUploader";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";

function AddWeeklyUpdates() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/archived", { state: 1 });
  };
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold text-center">Add Weekly Updates</p>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="mt-5 mx-auto lg:w-[60%] xl:w-[600px]"
        >
          {addWeeklyUpdates.map((item: FeildType) => {
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
          <FileUploader />
          <div className="flex justify-center mt-10">
            <CustomButton
              className="lg:w-[300px] w-[100%] h-[50px] text-[18px]"
              title="Save Update"
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AddWeeklyUpdates);
