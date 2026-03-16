import { Pagination, Select, Spin } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import AuthButton from "../component/partial/AuthButton";
import { useEffect, useState } from "react";
import MediaModal from "../component/partial/MediaModal";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useAuth, useRequest } from "../hooks";
import ViewDetails from "../component/shared/ViewDetails";
import { useData } from "../component/higherOrder/DataProvider";
import { Student } from "../types";
import MediaCard from "../component/shared/MediaCard";

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

  const { execute: deleteEvent } = useRequest("/multimedia", "DELETE", {
    type: "delay",
  });

  const handleDelete = (id: any) => {
    deleteEvent({
      routeParams: String(id),
      cbSuccess: () => {
        setData((prev: any) => prev.filter((item: any) => item.id !== id));
      },
    });
  };

  const handleEdit = (item: any) => {
    setOpen(true);
    setRecord(item);
  };

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

  const openAttachment = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            <MediaCard
              data={data}
              handleView={handleView}
              openAttachment={openAttachment}
              onDelete={handleDelete}
              onEdit={handleEdit}
              role={role}
            />
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
          onClose={() => {
            setOpen2(false);
            setRecord(null);
          }}
          data={record}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Multimedia);
