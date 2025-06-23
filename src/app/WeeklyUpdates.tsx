import { Input } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { weeklyUpdateColumns, weeklyUpdateData } from "../config";

function WeeklyUpdates() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={weeklyUpdateColumns}
          data={weeklyUpdateData}
          title="Weekly Updates"
          input={
            <div className="flex gap-5 items-center">
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
              <div>
                <img className="w-[25px]" src="/icons/filter.png" />
              </div>
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
}

export default WeeklyUpdates;
