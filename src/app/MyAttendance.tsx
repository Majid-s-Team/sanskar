import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { Link } from "react-router-dom";
import { teacherAttendanceColumns } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useAuth, useRequest } from "../hooks";
import { useEffect } from "react";

function MyAttendance() {
  const { user } = useAuth();
  const { data, loading, execute, pagination, onPaginationChange } = useRequest(
    "/teacher-attendance",
    "GET",
    {}
  );

  useEffect(() => {
    if (user?.teacher?.id) {
      execute({
        type: "mount",
        params: { teacher_id: `${user?.teacher?.id}` },
      });
    }
  }, [user]);

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={teacherAttendanceColumns()}
          data={data as any}
          title="Attendance Management"
          loading={loading}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          input={
            <div className="flex lg:flex-row flex-col justify-end gap-10">
              {/* <Link
                to={""}
                style={{
                  backgroundImage: "url(/images/card2.png)",
                  backgroundSize: "100% 100%",
                }}
                className="p-5 gap-1 rounded-[20px] flex gap-4 items-center lg:w-[260px] shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
              >
                <img
                  className="lg:w-[40px] w-[30px]"
                  src="/icons/plus.png"
                  alt=""
                />
                <p className="text-white text-[14px] medium">
                  Add New Attendance
                </p>
              </Link> */}
              <Link
                to={"/forms/absent-request-form"}
                style={{
                  backgroundImage: "url(/images/card2.png)",
                  backgroundSize: "100% 100%",
                }}
                className="p-5 gap-4 rounded-[20px] flex justify-between items-center w-[260px] shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
              >
                <img className="w-[50px]" src="/icons/pdf.png" alt="" />
                <div>
                  <p className="text-white text-[14px] medium">
                    Absent Request Form
                  </p>
                  {/* <p className="text-white text-[12px] regular">
                    28 Oct 2023 | 122 MB
                  </p> */}
                </div>
              </Link>
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(MyAttendance);
