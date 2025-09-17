import HomeLayout from "../../component/shared/HomeLayout";
import { DatePicker, notification } from "antd";
import CustomButton from "../../component/shared/CustomButton";
import { addNewAttendanceColumns } from "../../config";
import { useNavigate } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useRequest } from "../../hooks/useRequest";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TableData from "../../component/shared/Table";

function AddAttendance() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<any>("");
  const [attendance, setAttendance] = useState<any>([]);

  console.log(attendance, "attendance");

  const {
    data: studentList,
    loading,
    pagination,
    onPaginationChange,
    execute,
  } = useRequest<any>("/teachers", "GET", {
    routeParams: `${user?.teacher?.id}/students`,
  });

  console.log(pagination, "pagination");

  const { execute: execute2, loading: loading2 } = useRequest(
    "/teacher",
    "POST",
    {
      routeParams: `${user?.teacher?.id}/attendance`,
    }
  );

  const onFinish = () => {
    execute2({
      body: {
        attendance_date:
          dayjs(date).format("YYYY-MM-DD") ||
          dayjs(new Date()).format("YYYY-MM-DD"),
        attendance: attendance,
      },
      type: "mount",
      cbSuccess() {
        navigate(-1);
      },
      cbFailure(error) {
        // @ts-ignore
        if (error?.errors) {
          // @ts-ignore
          const errorMessages = Object.values(error.errors).flat();
          errorMessages.forEach((msg: any) => {
            notification.error({
              message: "Error",
              description: msg,
            });
          });
        }
      },
    });
  };

  useEffect(() => {
    if (user?.teacher?.id) {
      execute({
        type: "mount",
      });
    }
  }, [user]);

  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold">Add New Attendance</p>
        <div className="flex justify-end items-center">
          <div className="w-[250px]">
            <p className="text-[16px] regular">Date</p>
            <DatePicker
              onChange={(e) => setDate(e)}
              format={"DD-MM-YYYY"}
              className="h-[45px] w-full mt-2"
            />
          </div>
        </div>
        {/* <div className="border-l border-r border-[#E0E0E0] rounded-[12px] overflow-hidden my-10"> */}
        <TableData
          columns={addNewAttendanceColumns(setAttendance)}
          data={studentList?.students as any}
          loading={loading}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
        {/* </div> */}

        <div className="flex justify-center mt-10">
          <CustomButton
            onClick={onFinish}
            loading={loading2}
            className="lg:w-[300px] w-[100%] h-[50px] text-[18px]"
            title="Save Changes"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AddAttendance);
