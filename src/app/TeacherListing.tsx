import { useEffect, useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { Input } from "antd";
import { teacherManagementColumns } from "../config";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useDebounce } from "../hooks";

function TeacherListing() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchFIlter = useDebounce(search, 500);

  const {
    data,
    loading: teacherListLoading,
    pagination,
    onPaginationChange,
    execute: searchExecute,
  } = useRequest<any>("/teachers", "GET", {
    type: "mount",
  });

  useEffect(() => {
    if (searchFIlter && searchFIlter.trim() !== "") {
      // 🔍 search API
      searchExecute({
        type: "mount",
        params: { full_name: searchFIlter },
      });
    } else {
      // 🔄 reset full list
      searchExecute({
        type: "mount",
        params: {},
      });
    }
  }, [searchFIlter]);

  return (
    <HomeLayout>
      <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar"></div>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={teacherManagementColumns}
          scroll={800}
          data={data?.teachers}
          loading={teacherListLoading}
          title={"Teachers List"}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          input={
            <Input
              placeholder="Search"
              className={`search-input h-[47px] w-[300px] lg:w-[227.28px]`}
              style={{
                borderRadius: 6,
                backgroundColor: "#F5F4F9",
                border: "none",
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              prefix={<img className="w-[20px]" src="/icons/search.png" />}
            />
          }
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(TeacherListing);
