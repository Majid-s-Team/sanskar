import { useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { Input } from "antd";
import {
  archivedColumns,
  myClassColumns,
  otherClassColumns,
  weeklyUpdateData,
} from "../config";
import { Link } from "react-router-dom";

const tabs = [
  { id: 0, label: "My Class Updates", columns: myClassColumns },
  { id: 1, label: "Other Class Updates", columns: otherClassColumns },
  { id: 2, label: "Archived", columns: archivedColumns },
];

function ArchivedTable() {
  const [active, setActive] = useState(2);

  const handleTabClick = (id: number) => {
    setActive(id);
  };

  return (
    <HomeLayout>
      <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar">
        <div className="flex gap-5 items-center h-[150px] whitespace-nowrap px-4 mx-auto">
          {tabs.map((tab) => (
            <p
              key={tab.id}
              style={{
                boxShadow:
                  active === tab.id
                    ? "0px 10.87px 32.62px 0px #FF993A66"
                    : "none",
              }}
              onClick={() => handleTabClick(tab.id)}
              className={`semibold p-5 rounded-[21.75px] cursor-pointer ${
                active === tab.id
                  ? "text-white bg-[#D57D25] text-xl scale-105 transition-transform duration-300 ease-out"
                  : "text-[#242424] border border-[#CCCCCC] bg-white text-lg transition-transform duration-300 ease-in"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={tabs[active].columns}
          data={weeklyUpdateData}
          title={
            tabs[active].label === "Other Class Updates"
              ? "Other Class Updates"
              : "Weekly Updates"
          }
          input={
            <div className="flex lg:flex-row flex-col gap-5 items-center">
              <div className="flex gap-5 items-center">
                <img className="w-[25px]" src="/icons/filter.png" />
                <Input
                  placeholder="Search"
                  className={`search-input h-[47px] w-[300px] lg:w-[227.28px]`}
                  style={{
                    borderRadius: 6,
                    backgroundColor: "#F5F4F9",
                    border: "none",
                  }}
                  prefix={<img className="w-[20px]" src="/icons/search.png" />}
                />
              </div>

              {active === 0 && (
                <Link
                  to={"/add-weekly-updates"}
                  style={{
                    backgroundImage: "url(/images/card2.png)",
                    backgroundSize: "100% 100%",
                  }}
                  className="p-4 rounded-[20px] flex gap-4 items-center shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
                >
                  <img className="w-[30px]" src="/icons/plus.png" alt="" />
                  <p className="text-white text-[14px] medium">
                    Add Weekly Updates
                  </p>
                </Link>
              )}
            </div>
          }
        />
      </div>
    </HomeLayout>
  );
}

export default ArchivedTable;
