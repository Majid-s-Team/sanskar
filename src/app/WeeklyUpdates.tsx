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
import axios from "axios";
import saveAs from "file-saver";
// import { saveAs } from "file-saver";
// import axios from "axios";

function WeeklyUpdates() {
  const { user: userData } = useAuth();
  const [open, setOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState<any>();
  const [selectStudent, setSelectStudent] = useState<any>();
  const [rangeDate, setRangeDate] = useState<any>(null);
  const { data, execute, loading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  const {
    data: forStudentData,
    loading: forStudentLoading,
    execute: execute2,
    pagination,
    onPaginationChange,
  } = useRequest("/for-student", "GET", {});

  useEffect(() => {
    if (userData && userData.user?.id) {
      execute({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          setSelectStudent(res.data?.map((item: any) => item.id)[0]);
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    if (selectStudent) {
      execute2({
        type: "mount",
        params: { student_id: selectStudent },
      });
    }
  }, [selectStudent]);

  // const handleDownload = async (url: string, name: string) => {
  //   try {
  //     const response = await axios.get(`/api/${url}`, { responseType: "blob" });
  //     saveAs(response.data, name);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //   }
  // };

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      saveAs(response.data, name);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleViewDetails = (data: any) => {
    setOpen(true);
    setViewDetails(data);
  };

  useEffect(() => {
    if (rangeDate) {
      execute2({
        type: "mount",
        params: {
          student_id: selectStudent,
          start_date: rangeDate[0].format("YYYY-MM-DD"),
          end_date: rangeDate[1].format("YYYY-MM-DD"),
        },
      });
    }
  }, [rangeDate]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={weeklyUpdateColumns(handleDownload, handleViewDetails)}
          data={forStudentData as any}
          loading={forStudentLoading}
          title="Weekly Updates"
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          input={
            <div className="flex gap-5 items-center">
              <Select
                options={data?.map((item: any) => ({
                  value: item.id,
                  label: (
                    <p className="capitalize regular">
                      {item.first_name} {item.last_name}
                    </p>
                  ),
                }))}
                value={selectStudent}
                onChange={(value) => setSelectStudent(value)}
                className=""
                style={{
                  width: "180px",
                }}
              />
              {/* <Input
                placeholder="Search"
                className={`search-input h-[35px] lg:w-[227.28px]`}
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F5F4F9",
                  border: "none",
                }}
                prefix={<img className="w-[20px]" src="/icons/search.png" />}
              /> */}
              {/* <div>
                <img className="w-[25px]" src="/icons/filter.png" />
              </div> */}
              <DatePicker.RangePicker
                onChange={(e) => setRangeDate(e)}
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F5F4F9",
                  border: "none",
                }}
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
