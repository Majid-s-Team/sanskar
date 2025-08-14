import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeSection1 from "../component/partial/HomeSection1";
import HomeSection2 from "../component/partial/HomeSection2";
import HomeSection3 from "../component/partial/HomeSection3";
import { getStorageData } from "../helper";
import Carousel from "../component/shared/Carousel";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../component/shared/CustomButton";
import { Avatar, Spin } from "antd";
import { forms } from "../config";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRequest } from "../hooks/useRequest";
import { user } from "../repositories";
import { Student } from "../types";

const Home = () => {
  const role = getStorageData("role");
  const [activeStudent, setActiveStudent] = useState<any>();
  const { user: userData } = useAuth();
  const navigate = useNavigate();

  const { data, execute, loading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  console.log(data, "user");

  useEffect(() => {
    if (userData && userData?.id) {
      execute({
        type: "mount",
        routeParams: userData?.id + "/students",
      });
    }
  }, [userData]);

  // useEffect(() => {
  //   if (data?.students && data.students.length > 1) {
  //     setActiveStudent(data.students[1]);
  //   } else {
  //     setActiveStudent(data?.students[0]);
  //   }
  // }, [data]);

  return (
    <HomeLayout>
      <HomeSection1>
        {role === "parent" ? (
          <div className="bg-white p-5 rounded-[20.15px] flex justify-center items-center ">
            <div className="lg:w-full w-[330px]">
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : (
                <Carousel data={data} setStudent={setActiveStudent} />
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/archived", { state: 3 })}
            style={{
              backgroundImage: "url(/images/orange-card.png)",
              backgroundSize: "100% 100%",
              boxShadow: "0px 9.06px 27.18px 0px #FF993A66",
              borderRadius: "28px",
            }}
            className="p-5 rounded-[20.15px] flex justify-center flex-col gap-5 items-center cursor-pointer"
          >
            <img className="w-[72px]" src="/icons/wallet.png" alt="" />
            <p className="text-white text-[30px] semibold">View Archives</p>
          </div>
        )}
      </HomeSection1>
      <HomeSection2 role={role}>
        <div className="bg-white p-5 rounded-[26.61px] lg:col-span-5">
          <div className="flex justify-between items-center">
            <p className="text-[20px] semibold">
              {role === "parent" ? "Student Information" : "Calendars"}
            </p>
            <Link
              to={
                role === "parent" ? "/home/student-info" : "/gurukul-calendar"
              }
              className="text-[#0089ED] text-[13px] regular underline"
            >
              View All
            </Link>
          </div>
          {role === "parent" ? (
            <div>
              {loading ? (
                <div className="h-[500px] flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : (
                <Link to="/home/student-info" className="!text-black">
                  <div className="flex gap-2 mt-5 items-center">
                    <Avatar
                      size={64}
                      src={activeStudent?.profile_image || "/images/parent.png"}
                    />
                    <div>
                      <p className="text-[12px] regular">Student Name</p>
                      <p className="text-[20px] regular capitalize truncate w-[300px]">
                        {activeStudent?.first_name +
                          " " +
                          activeStudent?.last_name}
                      </p>
                    </div>
                  </div>
                  <div></div>
                  {[
                    {
                      icon: "/images/info1.png",
                      title: "Student ID",
                      value: activeStudent?.id || "-",
                    },
                    {
                      icon: "/images/info2.png",
                      title: "Class Name",
                      value: activeStudent?.gurukal?.name || "-",
                    },
                    {
                      icon: "/images/info4.png",
                      title: "House",
                      value: activeStudent?.house || "Atharva Veda",
                    },
                    {
                      icon: "/images/info3.png",
                      title: "Book Club",
                      value: activeStudent?.join_the_club ? "Yes" : "No",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-2 mt-5 items-center">
                      <img className="w-[72.98px]" src={item.icon} alt="" />
                      <div>
                        <p className="text-[12px] regular">{item.title}</p>
                        <p className="text-[20px] regular">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </Link>
              )}
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
                      <img
                        className="w-[50px]"
                        src={"/icons/card.png"}
                        alt=""
                      />
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
      </HomeSection2>
      <HomeSection3 role={role} />
    </HomeLayout>
  );
};

export default withAuthGuard(Home);
