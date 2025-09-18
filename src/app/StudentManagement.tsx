import { useEffect, useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import { Avatar, TablePaginationConfig } from "antd";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useAuth } from "../hooks/useAuth";
import { useRequest } from "../hooks/useRequest";
import { CustomPagination } from "../component/shared/CustomPagination";

function StudentManagement() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    if (user?.teacher?.id) {
      execute({
        type: "mount",
      });
    }
  }, [user]);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <HomeLayout loading={loading}>
      <p className="text-[30px] semibold">Student Management</p>
      {studentList?.students?.map((item: any, index: number) => {
        const isOpen = activeIndex === index;

        return (
          <div
            onClick={() => handleToggle(index)}
            key={index}
            className={`!w-full mt-5 bg-white p-5 rounded-[20px] transition-all duration-500 cursor-pointer ${
              isOpen
                ? "flex flex-col items-center"
                : "flex items-center justify-between "
            }`}
          >
            <div
              className={`transition-all duration-500 ${
                isOpen
                  ? "text-center space-y-5 mb-5"
                  : "flex items-center gap-5"
              }`}
            >
              <Avatar
                size={80}
                src={item?.student?.profile_image || "/images/teacher.png"}
              />
              <div className={isOpen ? "space-y-1" : ""}>
                <p className="text-[16px] semibold capitalize">
                  {item?.student?.first_name + " " + item?.student?.last_name ||
                    "Jane Cooper"}
                </p>
                <p className="text-[12px] regular">
                  {item?.student?.student_mobile_number || "+011 384 792302"}
                </p>
                <p className="text-[12px] regular">
                  {item?.student?.student_email || "janecooper@gmail.com"}
                </p>
              </div>
            </div>

            <div
              className={`flex gap-5 items-center ${
                isOpen ? "" : "lg:flex-row flex-col"
              }`}
            >
              <img className="w-[40px]" src="/icons/chat.png" alt="" />
              <img className="w-[40px]" src="/icons/call.png" alt="" />
            </div>

            {isOpen && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[200px] mt-10 lg:px-20" : "max-h-0"
                } w-full`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-[20px] semibold">Date Of Birth</p>
                    <p className="text-[20px] regular">
                      {item?.student?.dob || "08/08/2015"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[20px] semibold">School Name</p>
                    <p className="text-[20px] regular">
                      {item?.student?.school_name || "The School"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <CustomPagination
        current={(pagination?.current ?? 1) || 1}
        total={(pagination as TablePaginationConfig)?.total || 1}
        onChange={(page: any) => {
          onPaginationChange?.({ current: page });
        }}
        pageSize={(pagination as TablePaginationConfig)?.pageSize || 10}
      />
    </HomeLayout>
  );
}

export default withAuthGuard(StudentManagement);
