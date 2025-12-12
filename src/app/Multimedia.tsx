import { Pagination, Select, Spin } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import AuthButton from "../component/partial/AuthButton";
import { useEffect, useState } from "react";
import MediaModal from "../component/partial/MediaModal";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useAuth, useRequest } from "../hooks";
import ReactPlayer from "react-player";
import ViewDetails from "../component/shared/ViewDetails";
import { useData } from "../component/higherOrder/DataProvider";
import { Student } from "../types";

const validVideoTypes = [".mp4", ".mov", ".mkv", ".avi", ".webm"];

function Multimedia() {
  const { user } = useAuth();
  const role = user?.user?.role;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [record, setRecord] = useState<any | null>(null);
  const [selectStudent, setSelectStudent] = useState<number | undefined>();
  const { student } = useData();

  const { data, loading, setData, pagination, onPaginationChange, execute } =
    useRequest<any[]>("/multimedia", "GET", {
      type: "delay",
    });

  // const { execute: deleteEvent, loading: deleteLoading } = useRequest(
  //   "/multimedia",
  //   "DELETE",
  //   { type: "delay" }
  // );

  // const handleDelete = (id: any) => {
  //   deleteEvent({
  //     routeParams: String(id),
  //     cbSuccess: () => {
  //       setData((prev: any) => prev.filter((item: any) => item.id !== id));
  //     },
  //   });
  // };

  const handleView = (item: any) => {
    setOpen2(true);
    setRecord(item);
  };

  useEffect(() => {
    if (student) {
      setSelectStudent(student?.[0]?.id);
    }
  }, [student]);

  useEffect(() => {
    if (!selectStudent && role !== "teacher") return;

    const params =
      role === "teacher"
        ? { type: "teacher" }
        : { type: "teacher", student_id: selectStudent };

    execute({
      params,
    });
  }, [selectStudent, role]);

  const isVideo = (url: string) =>
    validVideoTypes.some((ext) => url?.includes(ext));

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[30px] semibold">Multimedia</p>
          {role === "teacher" ? (
            <div className="flex gap-5 items-center">
              <AuthButton onClick={() => setOpen(true)} text="Add Multimedia" />
            </div>
          ) : (
            <div className="flex gap-5 items-center">
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
              <Select
                options={student?.map((item: Student) => ({
                  value: item.id,
                  label: (
                    <p className="capitalize regular">
                      {item.first_name} {item.last_name}
                    </p>
                  ),
                }))}
                value={selectStudent}
                onChange={(value) => setSelectStudent(value)}
                style={{
                  width: "200px",
                }}
              />
            </div>
          )}
        </div>
        {loading ? (
          <div className="text-center h-[80vh] flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div className="grid lg:grid-cols-3 gap-8 my-10">
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-[#F1F2F1] p-4 text-center h-full flex flex-col justify-center items-center"
                >
                  {isVideo(item.url) ? (
                    <ReactPlayer
                      width="100%"
                      height={"100%"}
                      controls
                      src={item.url}
                    />
                  ) : (
                    <img
                      onClick={() => handleView(item.url)}
                      className="w-[81.96px] h-[81.96px] mb-5 mx-auto cursor-pointer"
                      src="/icons/pdf.png"
                      alt="pdf"
                    />
                  )}

                  <h3 className="mt-2 semibold text-[18px] capitalize">
                    {item.title}
                  </h3>
                  <p className="text-[10px] regular capitalize">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            {data && data?.length > 0 && (
              <div className="flex justify-center mt-5">
                <Pagination
                  onChange={(page: number, pageSize: number) =>
                    onPaginationChange({ current: page, pageSize })
                  }
                  {...pagination}
                />
              </div>
            )}
            {data && data?.length === 0 && (
              <div className="text-center h-[70vh] flex justify-center items-center">
                <p className="semibold text-[20px]">No media found</p>
              </div>
            )}
          </div>
        )}
      </div>
      {open && (
        <MediaModal
          open={open}
          setRecord={setRecord}
          record={record}
          onClose={() => setOpen(false)}
          setData={setData}
        />
      )}
      {open2 && (
        <ViewDetails
          open={open2}
          onClose={() => setOpen2(false)}
          data={record}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Multimedia);
