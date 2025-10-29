// import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { attendanceColumns } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useAuth, useRequest } from "../hooks";
import { Student } from "../types";
import { user } from "../repositories";
import { getStorageData } from "../helper";

function AttendanceManagement() {
  const { user: userData } = useAuth();
  const role = getStorageData("role");
  const [selectStudent, setSelectStudent] = useState<number | undefined>(
    undefined
  );
  const [allStudents, setAllStudents] = useState<Student[]>();
  const { execute: execute2, loading: studentLoading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  const {
    data,
    loading,
    // setData,
    pagination,
    onPaginationChange,
    execute: getAttendence,
  } = useRequest<any>(`/user/${userData?.user?.id}/students`, "GET", {
    type: role === "teacher" ? "mount" : "delay",
  });
  useEffect(() => {
    if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
      execute2({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          // setSelectStudent(res.data?.map((item: any) => item.id)[0]);
          const student = res?.data.filter(
            (item: any) => item.is_payment_done !== null
          );
          setAllStudents(student);
          setSelectStudent(
            res.data?.filter((item: any) => item.is_payment_done === 1)[0]?.id
          );
        },
      });
    }
  }, [userData]);
  useEffect(() => {
    if (
      userData &&
      userData.user?.id &&
      selectStudent &&
      selectStudent !== undefined
    ) {
      getAttendence({
        type: "delay",
        params: {
          student_id: selectStudent,
        },
      });
    }
  }, [selectStudent, userData]);

  const totalAbsent = data?.student?.absent_count ?? 0;
  const totalTardy = data?.student?.tardy_count ?? 0;

  return (
    <HomeLayout loading={loading || studentLoading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={attendanceColumns(data?.student)}
          data={data?.attendance_arrays?.recorded || []}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          title="Attendance Management"
          input={
            <div>
              {/* <div className="flex justify-end">
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
              </div> */}

              <div className="grid lg:grid-cols-2 gap-4 mt-5">
                {/* Absences */}
                <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                  <img className="w-[50px]" src="/icons/book1.png" alt="" />
                  <div>
                    <p className="text-[14px] regular">Total# of Absences</p>
                    <p className="text-[20px] semibold">{totalAbsent}</p>
                  </div>
                </div>

                {/* Tardies */}
                <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                  <img className="w-[50px]" src="/icons/book2.png" alt="" />
                  <div>
                    <p className="text-[14px] regular">Total# of Tardies</p>
                    <p className="text-[20px] semibold">{totalTardy}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 w-[200px] float-right">
                <Select
                  options={allStudents?.map((item: any) => ({
                    value: item.id,
                    label: (
                      <p className="capitalize regular">
                        {item.first_name} {item.last_name}
                      </p>
                    ),
                  }))}
                  placeholder="Please select"
                  loading={studentLoading}
                  value={selectStudent}
                  onChange={(value) => setSelectStudent(value)}
                  className="w-full"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AttendanceManagement);
