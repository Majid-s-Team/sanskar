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
import { AttendanceData } from "../../types";

function AddAttendance() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<any>("");
  const [date2, setDate2] = useState<any>(null);
  const [allStatus, setAllStatus] = useState<any>([]);
  const [attendance, setAttendance] = useState<any>([]);

  const { data, loading, execute } = useRequest<AttendanceData>(
    "/teacher",
    "GET",
    {}
  );

  useEffect(() => {
    if (user?.teacher?.id) {
      execute({
        type: "mount",
        routeParams: `${user?.teacher?.id}/attendances`,
      });
    }
  }, [user]);

  // const {
  //   data: studentList,
  //   loading,
  //   pagination,
  //   onPaginationChange,
  //   execute,
  // } = useRequest<any>("/teachers", "GET", {
  //   routeParams: `${user?.teacher?.id}/students`,
  // });

  const { execute: execute2, loading: loading2 } = useRequest(
    "/teacher",
    "POST",
    {
      routeParams: `${user?.teacher?.id}/attendance`,
    }
  );

  const { execute: execute3 } = useRequest("/attendance/statuses", "GET", {
    type: "mount",
  });

  useEffect(() => {
    execute3({
      type: "mount",
      cbSuccess(data) {
        setAllStatus(data);
      },
    });
  }, []);

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

  // useEffect(() => {
  //   if (user?.teacher?.id) {
  //     execute({
  //       type: "mount",
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    if (date2) {
      execute({
        type: "mount",
        routeParams: `${user?.teacher?.id}/attendances`,
        params: { date: dayjs(date2).format("YYYY-MM-DD") },
      });
    }
  }, [date2]);

  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold">Add New Attendance</p>
        <div className="flex justify-between items-center mt-5">
          <div className="w-[250px]">
            <p className="text-[16px] regular">Pervious Attendance</p>
            <DatePicker
              onChange={(e) => setDate2(e)}
              format={"DD-MM-YYYY"}
              className="h-[45px] w-full mt-2"
              maxDate={dayjs(new Date())}
            />
          </div>
          <div className="w-[250px]">
            <p className="text-[16px] regular">Date</p>
            <DatePicker
              onChange={(e) => setDate(e)}
              format={"DD-MM-YYYY"}
              className="h-[45px] w-full mt-2"
              maxDate={dayjs(new Date())}
            />
          </div>
        </div>
        {/* <div className="border-l border-r border-[#E0E0E0] rounded-[12px] overflow-hidden my-10"> */}
        <TableData
          columns={addNewAttendanceColumns(setAttendance, allStatus)}
          // data={studentList?.students as any}
          data={data?.arrays?.all as any}
          loading={loading}
          pagination={false}
          // pagination={pagination}
          // onPaginationChange={onPaginationChange}
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
