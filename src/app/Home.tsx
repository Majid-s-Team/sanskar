import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import Carousel from "../component/shared/Carousel";
import { Avatar, Button, Input, Progress } from "antd";
import { Link } from "react-router-dom";
import MultiMediaCarousel from "../component/partial/MultiMediaCarousel";
import CustomButton from "../component/shared/CustomButton";

const info = [
  {
    icon: "/images/info1.png",
    title: "Student ID",
    value: "9998",
  },
  {
    icon: "/images/info2.png",
    title: "House",
    value: "Not Assigned",
  },
  {
    icon: "/images/info3.png",
    title: "Book Club",
    value: "Yes",
  },
  {
    icon: "/images/info4.png",
    title: "Class Name",
    value: "English",
  },
];

const card = [
  {
    title: "Weekly Update",
    value: "35 Lesson",
    percentage: 75,
    image: "/images/boxblue.png",
    shadow: "0px 9.62px 28.85px 0px #369FFF66",
  },
  {
    title: "Multimedia",
    value: "42 Items",
    percentage: 75,
    image: "/images/boxorange.png",
    shadow: "0px 9.62px 28.85px 0px #FF993A66",
  },
  {
    title: "Announcement",
    value: "2 New updates",
    percentage: 75,
    image: "/images/boxgreen.png",
    shadow: "0px 9.62px 28.85px 0px #8AC53E66",
  },
  {
    title: "Contact Teacher",
    value: "Tap to view Profile",
    percentage: 75,
    image: "/images/boxyellow.png",
    shadow: "0px 9.62px 28.85px 0px #8AC53E66",
  },
];

const Home = () => {
  return (
    <HomeLayout>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="grid lg:grid-cols-2 bg-white p-5 rounded-[20.15px]">
          <div>
            <p className="text-[20px] semibold">Hey Alice.</p>
            <p className="text-[#797979] text-[14px] light">
              Welcome back! We're here to support you on your learning journey.
              Dive into your classes and keep progressing towards your goals
            </p>
          </div>
          <img
            className="w-[300px] h-[300px] lg:mt-[-40px] "
            src="/images/human.png"
            alt=""
          />
        </div>
        <div className="bg-white p-5 rounded-[20.15px] ">
          <Button className="float-right px-8 mb-5 h-[38.4px] !bg-[#FF881A] rounded-[10px] !border-none text-[16px] medium !text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]">
            Add Student
          </Button>
          <div className="flex justify-center items-center lg:w-full w-[330px]">
            <Carousel />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 xl:gap-10 lg:gap-5 gap-5 my-10">
        <div className="bg-white p-5 rounded-[26.61px] lg:col-span-5">
          <div className="flex justify-between items-center">
            <p className="text-[20px] semibold">Student Information</p>
            <Link
              to=""
              className="text-[#0089ED] text-[13px] regular underline"
            >
              View All
            </Link>
          </div>
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
        <div className="bg-white p-5 rounded-[26.61px] lg:col-span-7">
          <p className="text-[20px] semibold">Class Information</p>
          <div className="grid lg:grid-cols-2 gap-5 mt-5">
            {card.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "100% 100%",
                  boxShadow: item.shadow,
                }}
                className="p-6 gap-4 rounded-[20px] space-y-3"
              >
                <div>
                  <p className="text-white text-[20px] semibold">
                    {item.title}
                  </p>
                  <p className="text-white text-[14px] medium">{item.value}</p>
                </div>
                <Progress
                  type="circle"
                  strokeColor="#fff"
                  strokeWidth={8}
                  className="!text-white"
                  size={80}
                  percent={item.percentage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-12 gap-10 my-10">
        <div className="bg-white p-5 rounded-[26.61px] lg:col-span-8 space-y-5">
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
            <CustomButton title="View More" />
          </div>
        </div>
        <div className="bg-white p-8 rounded-[26.61px] lg:col-span-4">
          <div className="flex justify-between items-center">
            <p className="text-[20px] semibold">Gurukal Calender</p>
            <Link
              to=""
              className="text-[#0089ED] text-[13px] regular underline"
            >
              View All
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
            <CustomButton
              title="Download Now"
              icon={
                <img className="w-[24px]" src="/icons/download.png" alt="" />
              }
            />
          </div>
          <div className="flex justify-center mt-8">
            <CustomButton title="Gurukul Announcements" />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default withAuthGuard(Home);
