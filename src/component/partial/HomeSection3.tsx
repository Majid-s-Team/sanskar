import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../shared/CustomButton";
import MultiMediaCarousel from "./MultiMediaCarousel";

function HomeSection3({ role }: { role: string }) {
  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-12 gap-10 my-10">
      {role === "parent" && (
        <div className="bg-white xl:p-8 lg:p-5  rounded-[26.61px] lg:col-span-5">
          <div className="flex justify-between items-center">
            <p className="text-[20px] semibold">Gurukal Calendar</p>
            <Link
              to="/gurukul-calendar"
              className="text-[#0089ED] text-[13px] regular underline"
            >
              View
            </Link>
          </div>
          <div className="flex flex-col gap-5 mt-5 items-center text-center p-5 border border-[#ECECEC] rounded-[24px]">
            <img className="w-[30px]" src="/icons/card.png" alt="" />
            <p className="semibold text-[16px]">
              Academic year 2024-2025 (last updated on 12/16/2024)
            </p>
            <p className="regular text-[14px] text-[#A6A6A6]">
              29 Oct 2023 | 329.4 MB
            </p>
            <div className="flex gap-4 items-center">
              <img className="w-[40px]" src="/icons/eye.png" alt="" />
              <CustomButton
                onClick={() => navigate("/gurukul-calendar")}
                title="Download Now"
                icon={
                  <img className="w-[24px]" src="/icons/download.png" alt="" />
                }
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <CustomButton
              onClick={() => navigate("/home/announcement")}
              title="Gurukul Announcements"
            />
          </div>
        </div>
      )}
      <div
        className={`bg-white p-5 rounded-[26.61px] space-y-5 ${
          role === "parent" ? "lg:col-span-7" : "lg:col-span-12"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="text-[20px] semibold mb-5">Multimedia</p>
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
        </div>
        <div className="lg:w-full w-[330px]">
          <MultiMediaCarousel />
        </div>
        <div className="flex justify-center mt-8">
          <CustomButton
            onClick={() => navigate("/home/multimedia")}
            title="View More"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSection3;
