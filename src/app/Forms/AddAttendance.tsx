import HomeLayout from "../../component/shared/HomeLayout";
import { DatePicker, Input, notification } from "antd";
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
  const [allStatus, setAllStatus] = useState<any>([]);
  const [attendance, setAttendance] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

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
        attendance_date: dayjs(date).format("YYYY-MM-DD"),
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

  // && !dayjs(date).isSame(dayjs(), "day")

  useEffect(() => {
    if (search) {
      const result = data?.arrays?.all?.filter(
        (item: any) =>
          item.student.first_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.student.last_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result || []);
    } else {
      setFilteredData(data?.arrays?.all || []);
    }
  }, [search, data]);

  // useEffect(() => {
  //   if (date && !dayjs(date).isSame(dayjs(), "day")) {
  //     execute({
  //       type: "mount",
  //       routeParams: `${user?.teacher?.id}/attendances`,
  //       params: { date: dayjs(date).format("YYYY-MM-DD") },
  //     });
  //   }
  // }, [date]);

  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[40px] semibold">Add New Attendance</p>
        <div className="flex justify-between items-end mt-5">
          <Input
            placeholder="Search"
            className={`search-input h-[45px] lg:w-[300px]`}
            style={{
              borderRadius: 12,
              backgroundColor: "#fff",
              border: "1px solid #CCCCCC",
            }}
            onChange={(e) => setSearch(e.target.value)}
            // suffix={<img className="w-[20px]" src="/icons/filter.png" />}
            prefix={<img className="w-[20px]" src="/icons/search.png" />}
          />
          <div className="w-[250px] space-y-1">
            <p className="text-[16px] regular">Date</p>
            <DatePicker
              onChange={(e) => setDate(e)}
              format={"DD-MM-YYYY"}
              className="h-[45px] w-full"
              maxDate={dayjs(new Date())}
            />
          </div>
        </div>
        {/* <div className="border-l border-r border-[#E0E0E0] rounded-[12px] overflow-hidden my-10"> */}
        <TableData
          columns={addNewAttendanceColumns(setAttendance, allStatus)}
          // data={studentList?.students as any}
          data={filteredData}
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
