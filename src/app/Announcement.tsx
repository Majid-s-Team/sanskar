import { Pagination, Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import AuthButton from "../component/partial/AuthButton";
import { useEffect, useState } from "react";
import AnnouncementModal from "../component/partial/AnnouncementModal";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks";
import dayjs from "dayjs";
import { Student } from "../types";
import { user } from "../repositories";

function Announcement() {
  const { user: userData } = useAuth();
  const role = getStorageData("role");
  const [open, setOpen] = useState(false);
  const [selectStudent, setSelectStudent] = useState<any>();
  const url = role === "teacher" ? "/announcements" : "/annoucement-student";
  const {
    data,
    loading,
    setData,
    pagination,
    onPaginationChange,
    execute: getAnnouncement,
  } = useRequest<any>(url, "GET", {
    type: role === "teacher" ? "mount" : "delay",
  });

  const { data: TeacherData, execute } = useRequest<any>(
    "/teachers",
    "GET",
    {}
  );

  useEffect(() => {
    if (role === "teacher" && userData?.teacher?.id) {
      execute({
        type: "mount",
        routeParams: `${userData?.teacher?.id}`,
      });
    }
  }, [userData]);

  const {
    execute: execute2,
    loading: studentLoading,
    data: allStudents,
  } = useRequest<Student[]>(user.url, user.method, {});

  useEffect(() => {
    if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
      execute2({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          setSelectStudent(res.data?.map((item: any) => item.id)[0]);
        },
      });
    }
  }, [userData]);

  useEffect(() => {
    if (selectStudent && selectStudent !== "") {
      getAnnouncement({
        type: "mount",
        params: {
          student_id: selectStudent,
        },
      });
    }
  }, [selectStudent]);

  return (
    <HomeLayout loading={loading || studentLoading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <p className="text-[30px] semibold">Announcements</p>
          {role === "teacher" ? (
            <div className="flex gap-5 items-center">
              <Select
                style={{
                  // width: "200px",
                  height: "48px",
                }}
                className="custom-selector w-full lg:w-[200px]"
                disabled
                value={TeacherData?.gurukal?.name}
                options={[]}
              />
              <AuthButton
                onClick={() => setOpen(true)}
                text="Add Announcement"
              />
            </div>
          ) : (
            <Select
              options={allStudents?.map((item: any) => ({
                value: item.id,
                label: (
                  <p className="capitalize regular">
                    {item.first_name} {item.last_name}
                  </p>
                ),
              }))}
              loading={studentLoading}
              value={selectStudent}
              onChange={(value) => setSelectStudent(value)}
              className=""
              style={{
                width: "250px",
              }}
            />
          )}
        </div>
        {data?.length > 0 ? (
          data?.map((form: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-5 mt-5 border border-[#ECECEC] p-2 rounded-[20px]"
              >
                <div className="flex items-center gap-5">
                  <img className="w-[50px]" src={"/icons/ball2.png"} alt="" />
                  <div>
                    <p className="text-[14px] medium capitalize">
                      {form.title}
                    </p>
                    <p className="text-[12px] text-[#969696] regular capitalize">
                      {form.description}
                    </p>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-[14px] regular">
                    {dayjs(form.created_at).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-[13px] text-[#969696] regular">
                    {dayjs(form.created_at).format("hh:mm A")}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-[18px] text-[#969696] regular text-center h-[70vh] flex items-center justify-center">
            No announcement available.
          </p>
        )}
        <Pagination
          onChange={(page: number, pageSize: number) =>
            onPaginationChange({ current: page, pageSize })
          }
          {...pagination}
          className="mt-5 flex justify-end"
        />
      </div>
      {open && (
        <AnnouncementModal
          isModalOpen={open}
          handleCancel={() => setOpen(false)}
          setData={setData}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Announcement);
