import { useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import { Select } from "antd";
import { Link, useLocation } from "react-router-dom";
import { withAuthGuard } from "../component/higherOrder/withAuth";

const events = [
  { id: 1, name: "All Requests" },
  { id: 2, name: "Accepted Requests" },
  { id: 3, name: "Rejected Requests" },
];

function RequestManagement() {
  const { state } = useLocation();

  const [active, setActive] = useState<number>(() => {
    const id = typeof state === "number" ? state : 1;
    return events.some((tab) => tab.id === id) ? id : events[3].id;
  });

  const handleTabClick = (id: number) => {
    setActive(id);
  };

  return (
    <HomeLayout>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-between items-center  ">
          <p className="lg:text-[40px] text-[24px] semibold">
            Request Management
          </p>
          <Select
            style={{
              width: 200,
            }}
            placeholder="select category"
            options={[{ value: "All", label: "All" }]}
          />
        </div>
        <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar">
          <div className="flex gap-5 items-center h-[150px] whitespace-nowrap px-4 mx-auto">
            {events.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    boxShadow:
                      active === item.id
                        ? "0px 10.87px 32.62px 0px #FF993A66"
                        : "none",
                  }}
                  onClick={() => handleTabClick(item.id)}
                  className={`semibold p-5 rounded-[21.75px] cursor-pointer min-w-max ${
                    active === item.id
                      ? "text-white bg-[#D57D25] text-xl scale-105 transition-transform duration-300 ease-out"
                      : "text-[#242424] border border-[#CCCCCC] text-lg transition-transform duration-300 ease-in"
                  }`}
                >
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>

        <div className="space-y-5 mt-8">
          {[1, 2, 3].map((index) => {
            return (
              <div
                key={index}
                className="flex lg:flex-row flex-col lg:text-left text-center items-center gap-2 lg:gap-5 border border-[#ECECEC] p-5 rounded-[20px]"
              >
                <img className="w-[50px]" src={"/icons/wallet.png"} alt="" />
                <div>
                  <p className="text-[16px] semibold !text-black">Form no.9</p>
                  <p className="text-[14px] text-[#A6A6A6] regular">
                    29 Oct 2023 | 329.4 MB
                  </p>
                </div>
                <div className="flex-1"></div>
                <Link
                  to={"/request-management/form-details"}
                  className="flex items-center gap-2 bg-[#D57D25] p-4 rounded-[12px]"
                >
                  <img className="w-[20px]" src="/icons/doc.png" alt="" />
                  <p className="text-[16px] semibol text-white">View Details</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(RequestManagement);
