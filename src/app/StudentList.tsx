import { Input } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { studentListColumns } from "../config";
import StudentDetailsModal from "../component/partial/StudentDetailsModal";
import { useEffect, useState } from "react";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";

function StudentList() {
  const [openModal, setOpenModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState<any>(null);
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

  console.log(studentDetails, "studentList");

  useEffect(() => {
    if (user?.teacher?.id) {
      execute({
        type: "mount",
      });
    }
  }, [user]);

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
              <div>
                <img className="w-[25px]" src="/icons/filter.png" />
              </div>
              <Input
                placeholder="Search"
                className={`search-input h-[35px] w-[300px] lg:w-[227.28px]`}
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F5F4F9",
                  border: "none",
                }}
                prefix={<img className="w-[20px]" src="/icons/search.png" />}
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
