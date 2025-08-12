import { Button } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";

function Calendar() {
  return (
    <HomeLayout>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px] h-full">
        <p className="text-[40px] semibold">Calendar</p>
        <p className="text-[32px] semibold my-5">Gurukal Calendar</p>

        <div className="flex items-center justify-between gap-5 mt-5 border border-[#ECECEC] p-5 rounded-[24px]">
          <div className="flex items-center gap-5">
            <img className="w-[50px]" src={"/icons/card.png"} alt="" />
            <div>
              <p className="text-[16px] semibold !text-black">
                Academic year 2024-2025 (last updated on 12/16/2024)
              </p>
              <p className="text-[14px] text-[#A6A6A6] regular">
                29 Oct 2023 | 329.4 MB
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <img className="w-[28px]" src="/icons/eye.png" alt="" />
            <Button
              className={`rounded-[12px] !bg-[#D57D25] h-[40px] red-medium !text-white border-0 text-[12px] semibold`}
              icon={
                <img className="w-[20px]" src="/icons/download.png" alt="" />
              }
            >
              Download Now
            </Button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(Calendar);
