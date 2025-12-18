import { Popconfirm, Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import AuthButton from "../component/partial/AuthButton";
import { useEffect, useState } from "react";
import AnnouncementModal from "../component/partial/AnnouncementModal";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks";
import dayjs from "dayjs";
import { AnnouncementType, Student } from "../types";
// import { user } from "../repositories";
import { useData } from "../component/higherOrder/DataProvider";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function Announcement() {
  const { user: userData } = useAuth();
  const role = getStorageData("role");
  const { student, loading: studentLoading } = useData();
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<AnnouncementType | null>(null);
  const [selectStudent, setSelectStudent] = useState<number | undefined>(
    undefined
  );
  // const [allStudents, setAllStudents] = useState<Student[]>();
  const url = role === "teacher" ? "/announcements" : "/annoucement-student";
  const {
    data,
    loading,
    setData,
    // pagination,
    // onPaginationChange,
    execute: getAnnouncement,
  } = useRequest<AnnouncementType[]>(url, "GET", {
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

  const { execute: deleteEvent, loading: deleteLoading } = useRequest(
    "/announcements",
    "DELETE",
    { type: "delay" }
  );

  const handleDelete = (id: any) => {
    deleteEvent({
      routeParams: String(id),
      cbSuccess: () => {
        setData((prev: any) => prev.filter((item: any) => item.id !== id));
      },
    });
  };

  useEffect(() => {
    if (student) {
      setSelectStudent(student?.[0]?.id);
    }
  }, [student]);

  useEffect(() => {
    if (selectStudent && selectStudent !== undefined) {
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
              options={student?.map((item: Student) => ({
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
        {data && data?.length > 0 ? (
          data?.map((form: AnnouncementType, index: number) => {
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
                {role === "teacher" ? (
                  <div className="flex justify-end gap-5">
                    <EditFilled
                      onClick={() => {
                        setOpen(true);
                        setRecord(form);
                      }}
                      className="text-[#D57D25] cursor-pointer text-[18px]"
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this announcement?"
                      onConfirm={() => handleDelete(form.id)}
                      okButtonProps={{ loading: deleteLoading }}
                    >
                      <DeleteFilled
                        className={`text-[#D57D25] text-[18px] ${
                          deleteLoading
                            ? "opacity-50 pointer-events-none"
                            : "cursor-pointer"
                        }`}
                      />
                    </Popconfirm>
                  </div>
                ) : (
                  <div className="text-right mr-4">
                    <p className="text-[14px] regular">
                      {dayjs(form.created_at).format("MM-DD-YYYY")}
                    </p>
                    <p className="text-[13px] text-[#969696] regular">
                      {dayjs(form.created_at).format("hh:mm A")}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-[18px] text-[#969696] regular text-center h-[70vh] flex items-center justify-center">
            No announcement available.
          </p>
        )}
        {/* <Pagination
          onChange={(page: number, pageSize: number) =>
            onPaginationChange({ current: page, pageSize })
          }
          {...pagination}
          className="mt-5 flex justify-end"
        /> */}
      </div>
      {open && (
        <AnnouncementModal
          isModalOpen={open}
          handleCancel={() => {
            setOpen(false);
            setRecord(null);
          }}
          setData={setData}
          record={record}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Announcement);
