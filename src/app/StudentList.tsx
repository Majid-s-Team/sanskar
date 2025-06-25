import { Input } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { studentListColumns, studentListData } from "../config";

function StudentList() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={studentListColumns}
          data={studentListData}
          title="Student List"
          input={
            <div className="flex gap-5 items-center">
              <div>
                <img className="w-[25px]" src="/icons/filter.png" />
              </div>
              <Input
                placeholder="Search"
                className={`search-input h-[35px] lg:w-[227.28px]`}
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
      </div>
    </HomeLayout>
  );
}

export default StudentList;
