import { Input, Table } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { Link } from "react-router-dom";
import { studentAttendanceColumns, studentAttendanceData } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";

function StudentAttendance() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="lg:flex justify-between mb-5">
          <p className="text-[#242424] text-[40px] semibold lg:mb-0 mb-4">
            Student Attendance
          </p>
          <Link
            to={"/add-attendance"}
            style={{
              backgroundImage: "url(/images/card2.png)",
              backgroundSize: "100% 100%",
            }}
            className="p-5 gap-4 rounded-[20px] flex items-center w-[260px] shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
          >
            <img className="w-[40px]" src="/icons/plus.png" alt="" />
            <p className="text-white text-[14px] medium">Add New Attendance</p>
          </Link>
        </div>
        <div className="lg:flex justify-between mb-5">
          <p className="text-[#242424] text-[24px] semibold lg:mb-0 mb-4">
            All Attendance and Participation
          </p>
          <div>
            <div className="flex gap-5 items-center justify-end">
              <Input
                placeholder="Search"
                className={`search-input h-[45px] lg:w-[300px]`}
                style={{
                  borderRadius: 12,
                  backgroundColor: "#fff",
                  border: "1px solid #CCCCCC",
                }}
                suffix={<img className="w-[20px]" src="/icons/filter.png" />}
                prefix={<img className="w-[20px]" src="/icons/search.png" />}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-4 mt-5 w-full">
              <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                <img className="w-[50px]" src="/icons/book1.png" alt="" />
                <div>
                  <p className="text-[14px] regular">Total# of Absences</p>
                  <p className="text-[20px] semibold">10</p>
                </div>
              </div>
              <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                <img className="w-[50px]" src="/icons/book2.png" alt="" />
                <div>
                  <p className="text-[14px] regular">Total# of Presence</p>
                  <p className="text-[20px] semibold">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table
          scroll={{ x: 800 }}
          columns={studentAttendanceColumns()}
          dataSource={studentAttendanceData}
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(StudentAttendance);
