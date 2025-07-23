import { Avatar, Progress } from "antd";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../shared/CustomButton";
import { info, forms, card2, card } from "../../config";

interface CardItem {
  title: string;
  value: string;
  image: string;
  shadow: string;
  path: string;
  percentage?: number; // add this property
}

function HomeSection2({ role }: { role: string }) {
  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-12 xl:gap-10 lg:gap-5 gap-5 my-10">
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-5">
        <div className="flex justify-between items-center">
          <p className="text-[20px] semibold">
            {role === "parent" ? "Student Information" : "Calendars"}
          </p>
          <Link
            to={role === "parent" ? "/home/student-info" : "/gurukul-calendar"}
            className="text-[#0089ED] text-[13px] regular underline"
          >
            View All
          </Link>
        </div>
        {role === "parent" ? (
          <Link to="/home/student-info" className="!text-black">
            <div className="flex gap-2 mt-5 items-center">
              <Avatar size={64} src="/images/parent.png" />
              <div>
                <p className="text-[12px] regular">Student Name</p>
                <p className="text-[20px] regular">John Doe</p>
              </div>
            </div>
            {info.map((item, index) => (
              <div key={index} className="flex gap-2 mt-5 items-center">
                <img className="w-[72.98px]" src={item.icon} alt="" />
                <div>
                  <p className="text-[12px] regular">{item.title}</p>
                  <p className="text-[20px] regular">{item.value}</p>
                </div>
              </div>
            ))}
          </Link>
        ) : (
          <div>
            {forms.map((form, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-5 mt-5 border border-[#ECECEC] p-5 rounded-[24px]"
                >
                  <div className="flex items-center gap-5">
                    <img className="w-[50px]" src={"/icons/card.png"} alt="" />
                    <div>
                      <p className="text-[16px] semibold !text-black">
                        {form.title}
                      </p>
                      <p className="text-[14px] text-[#A6A6A6] regular">
                        {form.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-[20px]"
                      src="/icons/download-orange.png"
                      alt=""
                    />
                    <img
                      className="w-[24px] mb-[-5px]"
                      src="/icons/eye.png"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center mt-20">
              <CustomButton
                onClick={() => navigate("/home/gurukul-announcements")}
                title="Gurukul Announcements"
              />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-7">
        <p className="text-[20px] semibold">Class Information</p>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          {(role === "parent" ? card : card2).map((item: CardItem, index) => (
            <div
              onClick={() => navigate(item.path, { state: 1 })}
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "100% 100%",
                boxShadow: item.shadow,
                height: "200px",
              }}
              className="p-6 gap-4 rounded-[20px] space-y-3 cursor-pointer"
            >
              <div>
                <p className="text-white text-[20px] semibold">{item.title}</p>
                <p className="text-white text-[14px] medium">{item.value}</p>
              </div>
              {role === "parent" && item?.percentage && (
                <Progress
                  type="circle"
                  strokeColor="#fff"
                  strokeWidth={8}
                  className="!text-white"
                  size={80}
                  percent={item?.percentage}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
