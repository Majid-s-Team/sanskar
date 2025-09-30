import { DatePicker, Input, Table } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { Link } from "react-router-dom";
import { studentAttendanceColumns } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { AttendanceData } from "../types/api/studentAttendanceType";
import StudentDetailsModal from "../component/partial/StudentDetailsModal";
import dayjs from "dayjs";

function StudentAttendance() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [date, setDate] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { data, loading, execute } = useRequest<AttendanceData>(
    "/teacher",
    "GET",
    {}
  );

  const present = data?.counts?.present || 0;

  const absences =
    (data?.counts?.excused_absence ?? 0) +
    (data?.counts?.unexcused_absence ?? 0);

  useEffect(() => {
    if (user?.teacher?.id) {
      execute({
        type: "mount",
        routeParams: `${user?.teacher?.id}/attendances`,
      });
    }
  }, [user]);

  useEffect(() => {
    if (data?.arrays?.all) {
      setFilteredData(data.arrays.all);
    }
  }, [data]);

  useEffect(() => {
    if (date) {
      execute({
        type: "mount",
        routeParams: `${user?.teacher?.id}/attendances`,
        params: { date: dayjs(date).format("YYYY-MM-DD") },
      });
    }
  }, [date]);

  const handleDetails = (record: any) => {
    setStudentDetails(record);
    setOpenModal(true);
  };

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
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="lg:flex justify-between mb-5">
          <p className="text-[#242424] text-[40px] semibold lg:mb-0 mb-4">
            Student Attendance
          </p>
          <div className="flex gap-5 items-center">
            <Link
              to={"/add-attendance"}
              style={{
                backgroundImage: "url(/images/card2.png)",
                backgroundSize: "100% 100%",
              }}
              className="p-5 gap-4 rounded-[20px] flex items-center w-[260px] shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
            >
              <img className="w-[40px]" src="/icons/plus.png" alt="" />
              <p className="text-white text-[14px] medium">
                Add New Attendance
              </p>
            </Link>
          </div>
        </div>
        <div className="lg:flex justify-between mb-5">
          <p className="text-[#242424] text-[24px] semibold lg:mb-0 mb-4">
            All Attendance and Participation
          </p>
          <div>
            <div className="flex gap-5 items-center justify-end">
              <DatePicker
                placeholder="Select Date"
                className={`search-input h-[45px] lg:w-[300px]`}
                onChange={(e) => setDate(e)}
                format={"DD-MM-YYYY"}
                maxDate={dayjs(new Date())}
                style={{
                  borderRadius: 12,
                  backgroundColor: "#fff",
                  border: "1px solid #CCCCCC",
                }}
              />
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
            </div>
            <div className="grid lg:grid-cols-2 gap-4 mt-5 w-full">
              <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                <img className="w-[50px]" src="/icons/book1.png" alt="" />
                <div>
                  <p className="text-[14px] regular">Total# of Absences</p>
                  <p className="text-[20px] semibold">
                    {String(absences) || "0"}
                  </p>
                </div>
              </div>
              <div className="p-3 gap-4 border border-[#FF993A] rounded-[20px] flex items-center shadow-[0px_8px_8px_0px_rgba(255,153,58,0.25)]">
                <img className="w-[50px]" src="/icons/book2.png" alt="" />
                <div>
                  <p className="text-[14px] regular">Total# of Presence</p>
                  <p className="text-[20px] semibold">
                    {String(present) || "10"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table
          // pagination={pagination}
          // onPaginationChange={onPaginationChange}
          columns={studentAttendanceColumns(handleDetails)}
          dataSource={filteredData}
          pagination={false}
          // data={studentList?.students as any}
          loading={loading}
        />
      </div>
      {openModal && (
        <StudentDetailsModal
          record={studentDetails}
          isModalOpen={openModal}
          handleCancel={() => setOpenModal(false)}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(StudentAttendance);
