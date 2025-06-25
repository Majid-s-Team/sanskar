import { Button } from "antd";
import HomeLayout from "../component/shared/HomeLayout";

function EventDetails() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <p className="text-[40px] semibold mb-5">Event Details</p>
        <img
          className="w-full lg:h-[300px] h-[200px] object-cover rounded-[23.31px]"
          src="/images/img.png"
          alt=""
        />
        <div className="space-y-5 my-5">
          <p className="text-[30px] semibold">Event Details</p>
          <p className="text-[20px] regular text-[#333342]">
            A visit to a museum is an enriching and educational experience that
            allows us to explore the wonders of history, art, and culture.
          </p>
          <div className="space-y-2 mt-5">
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/date-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">28 May,2025</p>
            </div>
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/time-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">4:30 PM - 7:00 PM</p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[30px]"
                src="/icons/address-orange.png"
                alt=""
              />
              <p className="text-[#242424] text-[20px]">XYZ Hall, QZR Street</p>
            </div>
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/date-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">
                RSVP Due Date - 22 May,2025{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-4 mt-10 justify-center">
          <Button
            style={{
              boxShadow: "0px 10px 20px 0px #24242440",
            }}
            className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
          >
            Attending
          </Button>
          <Button
            style={{
              boxShadow: "0px 10px 20px 0px #24242440",
            }}
            className="h-[54px] px-20 !bg-[#FF0308] rounded-[10px] !border-none text-[20px] medium !text-white"
          >
            Not Attending
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}

export default EventDetails;
