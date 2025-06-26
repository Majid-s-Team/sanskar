import { Avatar, Progress } from "antd";
import { Link } from "react-router-dom";
import CustomButton from "../shared/CustomButton";
import { info, forms, card2, card } from "../../config";

function HomeSection2({ role }: { role: string }) {
  return (
    <div className="grid lg:grid-cols-12 xl:gap-10 lg:gap-5 gap-5 my-10">
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-5">
        <div className="flex justify-between items-center">
          <p className="text-[20px] semibold">
            {role === "parent" ? "Student Information" : "Calenders"}
          </p>
          <Link
            to="/home/student-info"
            className="text-[#0089ED] text-[13px] regular underline"
          >
            View All
          </Link>
        </div>
        {role === "parent" ? (
          <div>
            <div className="flex gap-2 mt-5 items-center">
              <Avatar size={64} src="/images/user.png" />
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
          </div>
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
              <CustomButton title="Gurukul Announcements" />
            </div>
          </div>
        )}
      </div>
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-7">
        <p className="text-[20px] semibold">Class Information</p>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          {(role === "parent" ? card : card2).map((item, index) => (
            <Link
              to={item.path || ""}
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
              {item.percentage && (
                <Progress
                  type="circle"
                  strokeColor="#fff"
                  strokeWidth={8}
                  className="!text-white"
                  size={80}
                  percent={item.percentage}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
