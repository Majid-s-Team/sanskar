import HomeLayout from "../../component/shared/HomeLayout";
import { DatePicker, Table } from "antd";
import CustomButton from "../../component/shared/CustomButton";
import { addNewAttendanceColumns, addNewAttendanceData } from "../../config";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";

function AddAttendance() {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold">Add New Attendance</p>
        <div className="flex justify-end items-center">
          <div className="w-[250px]">
            <p className="text-[16px] regular">Date</p>
            <DatePicker className="h-[45px] w-full mt-2" />
          </div>
        </div>
        <div className="border-l border-r border-[#E0E0E0] rounded-[12px] overflow-hidden my-10">
          <Table
            columns={addNewAttendanceColumns()}
            dataSource={addNewAttendanceData}
            pagination={false}
          />
        </div>

        <div className="flex justify-center mt-10">
          <CustomButton
            onClick={() => navigate(-1)}
            className="lg:w-[300px] w-[100%] h-[50px] text-[18px]"
            title="Save Changes"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AddAttendance);
