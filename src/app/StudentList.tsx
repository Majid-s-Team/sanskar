import { Input, Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { studentListColumns } from "../config";
import StudentDetailsModal from "../component/partial/StudentDetailsModal";
import { useEffect, useState } from "react";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";
import { useDebounce, useFileDownloader } from "../hooks";
import CustomButton from "../component/shared/CustomButton";

function StudentList() {
  const [openModal, setOpenModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState<any>(null);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("csv");
  const searchFilter = useDebounce(search, 500);
  const { download, downloadLoading } = useFileDownloader();
  const { user } = useAuth();

  const {
    data: studentList,
    loading,
    pagination,
    onPaginationChange,
    execute,
  } = useRequest<any>("/teachers", "GET", {
    routeParams: `${user?.teacher?.id}/students`,
  });

  useEffect(() => {
    if (!user?.teacher?.id) return; // ✅ agar teacher id nahi hai to kuch mat karo

    execute({
      type: "mount",
      params:
        searchFilter && searchFilter.trim() !== ""
          ? { name: searchFilter }
          : {},
      routeParams: `${user.teacher.id}/students`, // ✅ ab hamesha defined rahega
    });
  }, [searchFilter, user?.teacher?.id]);

  useEffect(() => {
    if (user && user.teacher && user.teacher.id) {
      execute({
        type: "mount",
        routeParams: `${user.teacher.id}/students`,
      });
    }
  }, [user]);

  const onDownload = () => {
    download({
      url: "/students/download",
      filter,
      params: { key: filter, search: searchFilter },
    });
  };

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={studentListColumns}
          data={studentList?.students as any}
          loading={loading}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          title="Student List"
          onClick={(row: any) => {
            setStudentDetails(row?.student);
            setOpenModal(true);
          }}
          input={
            <div className="flex gap-5 items-center">
              <Input
                placeholder="Search"
                className={`search-input h-[35px] min-w-[300px] lg:w-[227.28px]`}
                allowClear
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F5F4F9",
                  border: "none",
                }}
                onChange={(e) => setSearch(e.target.value)}
                prefix={<img className="w-[20px]" src="/icons/search.png" />}
              />
              <Select
                options={[
                  {
                    value: "csv",
                    label: "CSV",
                  },
                  {
                    value: "xlsx",
                    label: "XLSX",
                  },
                ]}
                value={filter}
                defaultValue="csv"
                onChange={(e) => setFilter(e)}
              />
              <CustomButton
                title="Download"
                onClick={onDownload}
                loading={downloadLoading}
              />
            </div>
          }
        />
        {openModal && (
          <StudentDetailsModal
            record={studentDetails}
            isModalOpen={openModal}
            handleCancel={() => setOpenModal(false)}
          />
        )}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(StudentList);
