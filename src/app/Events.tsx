import { useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import EventCard from "../component/partial/EventCard";

const events = ["All Events", "My Events", "Past Events"];

export default function Events() {
  const [active, setActive] = useState(0);
  return (
    <HomeLayout>
      <div className="bg-white p-10 rounded-[24.59px]">
        <p className="text-[30px] semibold">Events</p>
        <div className="flex justify-center items-center">
          <div className="flex gap-5 items-center lg:flex-row flex-col">
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
                  className={`semibold p-5 rounded-[21.75px] ${
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
        <div className="lg:space-y-20 space-y-10 mt-20">
          {[1, 2, 3].map((index) => {
            return (
              <div key={index}>
                <EventCard />
              </div>
            );
          })}
        </div>
      </div>
    </HomeLayout>
  );
}
