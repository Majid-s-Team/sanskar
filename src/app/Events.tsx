import { useEffect, useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import { EventCard } from "../component/partial/EventCard";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import { Pagination } from "antd";
const events = ["All Events", "My Events", "Past Events"];

function Events() {
  const [active, setActive] = useState(0);
  const params =
    active === 0
      ? {}
      : active === 1
      ? { type: "attending" }
      : { type: "not_attending" };

  const { data, loading, pagination, onPaginationChange, execute } =
    useRequest<any>("/events", "GET", {
      type: "mount",
      // params: params,
    });

  useEffect(() => {
    execute({
      params: params,
    });
  }, [active]);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px]">
        <p className="text-[40px] semibold">Events</p>
        <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar">
          <div className="flex gap-5 items-center h-[150px] whitespace-nowrap px-4 mx-auto">
            {events.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    boxShadow:
                      active === index
                        ? "0px 10.87px 32.62px 0px #FF993A66"
                        : "none",
                  }}
                  onClick={() => setActive(index)}
                  className={`semibold p-5 rounded-[21.75px] cursor-pointer ${
                    active === index
                      ? "text-white bg-[#D57D25] text-xl scale-105 transition-transform duration-300 ease-out"
                      : "text-[#242424] border border-[#CCCCCC] text-lg transition-transform duration-300 ease-in"
                  }`}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="lg:space-y-20 space-y-10 mt-5">
          {data.map((item: any, i: number) => (
            <EventCard
              item={item}
              key={i}
              isPast={active === 2}
              isMy={active === 1}
            />
          ))}
          <Pagination
            {...pagination}
            onChange={(page: number, pageSize: number) =>
              onPaginationChange({
                current: page,
                pageSize,
              })
            }
            className="flex justify-center mt-10"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(Events);
