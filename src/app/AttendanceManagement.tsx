import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { attendanceColumns, attendanceData } from "../config";

export default function AttendanceManagement() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={attendanceColumns()}
          data={attendanceData}
          title="Attendance Management"
          input={
            <div>
              <div className="flex justify-end">
                <Link
                  to={"/forms/absent-request-form"}
                  style={{
                    backgroundImage: "url(/images/card2.png)",
                    backgroundSize: "100% 100%",
                  }}
                  className="p-5 gap-4 rounded-[20px] flex justify-between items-center lg:w-[260px] shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
                >
                  <img className="w-[50px]" src="/icons/pdf.png" alt="" />
                  <div>
                    <p className="text-white text-[14px] medium">
                      Absent Request Form
                    </p>
                    <p className="text-white text-[12px] regular">
                      28 Oct 2023 | 122 MB
                    </p>
                  </div>
                </Link>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 mt-5">
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
                    <p className="text-[14px] regular">Total# of Tardies</p>
                    <p className="text-[20px] semibold">10</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
}
