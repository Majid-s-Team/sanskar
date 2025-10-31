import { DatePicker, Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { weeklyUpdateColumns } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRequest } from "../hooks/useRequest";
import { user } from "../repositories";
import { Student } from "../types";
import ViewDetails from "../component/shared/ViewDetails";
// import axios from "axios";
// import saveAs from "file-saver";

function WeeklyUpdates() {
  const { user: userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState<any>();
  const [selectStudent, setSelectStudent] = useState<number | undefined>(
    undefined
  );
  const [allStudents, setAllStudents] = useState<Student[]>();
  const [rangeDate, setRangeDate] = useState<any>(null);
  const { execute, loading } = useRequest<Student[]>(user.url, user.method, {});

  const {
    data: forStudentData,
    loading: forStudentLoading,
    execute: execute2,
    pagination,
    onPaginationChange,
  } = useRequest("/for-student", "GET", {
    type: "delay",
  });

  useEffect(() => {
    if (userData && userData.user?.id) {
      execute({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          // setSelectStudent(res.data?.map((item: any) => item.id)[0]);
          const student = res?.data.filter(
            (item: any) => item.is_payment_done === 1
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
    if (selectStudent !== undefined) {
      execute2({
        type: "mount",
        params: { student_id: selectStudent },
      });
    }
  }, [selectStudent]);

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url; // direct file URL
    link.target = "_blank";
    link.setAttribute("download", name); // file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleViewDetails = (data: any) => {
    setOpen(true);
    setViewDetails(data);
  };

  useEffect(() => {
    if (!selectStudent) return;
    if (rangeDate) {
      execute2({
        type: "mount",
        params: {
          student_id: selectStudent,
          start_date: rangeDate[0].format("YYYY-MM-DD"),
          end_date: rangeDate[1].format("YYYY-MM-DD"),
        },
      });
    } else {
      execute2({
        type: "mount",
        params: {
          student_id: selectStudent,
        },
      });
    }
  }, [rangeDate]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={weeklyUpdateColumns({ handleDownload, handleViewDetails })}
          data={forStudentData as any}
          loading={forStudentLoading}
          title="Weekly Updates"
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          input={
            <div className="flex gap-5 items-center">
              <Select
                options={allStudents?.map((item: any) => ({
                  value: item.id,
                  label: (
                    <p className="capitalize regular">
                      {item.first_name} {item.last_name}
                    </p>
                  ),
                }))}
                value={selectStudent}
                onChange={(value) => {
                  setSelectStudent(value);
                  setRangeDate(null);
                }}
                className=""
                style={{
                  width: "180px",
                }}
              />
              <DatePicker.RangePicker
                onChange={(e) => setRangeDate(e)}
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F5F4F9",
                  border: "none",
                }}
                value={rangeDate}
                format={"DD-MM-YYYY"}
                className={`search-input h-[47px] w-full lg:w-[300px]`}
                allowClear={true}
              />
            </div>
          }
        />
      </div>
      {open && (
        <ViewDetails
          open={open}
          onClose={() => setOpen(false)}
          data={viewDetails}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(WeeklyUpdates);
