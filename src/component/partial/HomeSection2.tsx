import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface CardItem {
  title: string;
  value: string;
  image: string;
  shadow: string;
  path: string;
  percentage?: number;
}

function HomeSection2({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { user: userData } = useAuth();

  const card = [
    {
      title: "Weekly Update",
      value: userData?.stats?.total_weekly_updates
        ? userData?.stats?.total_weekly_updates + " Lesson"
        : "0 Lesson",
      percentage: 75,
      image: "/images/boxblue.png",
      shadow: "0px 9.62px 28.85px 0px #369FFF66",
      path: "/home/weekly-updates",
    },
    {
      title: "Announcements",
      value: userData?.stats?.total_announcements
        ? userData?.stats?.total_announcements + " New updates"
        : "0 New updates",
      percentage: 25,
      image: "/images/boxgreen.png",
      shadow: "0px 9.62px 28.85px 0px #8AC53E66",
      path: "/home/announcement",
    },
    {
      title: "Multimedia",
      value: userData?.stats?.total_multimedia
        ? userData?.stats?.total_multimedia + " Items"
        : "0 Items",
      percentage: 50,
      image: "/images/boxorange.png",
      shadow: "0px 9.62px 28.85px 0px #FF993A66",
      path: "/home/multimedia",
    },
    {
      title: "Contact Teacher",
      value: "Tap to view Profile",
      image: "/images/boxyellow.png",
      shadow: "0px 9.62px 28.85px 0px #8AC53E66",
      path: "/home/contact-teacher",
    },
  ];

  const card2 = [
    {
      title: "Weekly Updates",
      value: userData?.stats?.total_weekly_updates
        ? userData?.stats?.total_weekly_updates + " Lesson"
        : "0 Lesson",
      // percentage: 75,
      image: "/images/boxblue.png",
      shadow: "0px 9.62px 28.85px 0px #369FFF66",
      path: "/archived",
    },
    {
      title: "Announcements",
      value: userData?.stats?.total_announcements
        ? userData?.stats?.total_announcements + " New updates"
        : "0 New updates",
      image: "/images/boxgreen.png",
      shadow: "0px 9.62px 28.85px 0px #8AC53E66",
      path: "/home/announcement",
    },
    {
      title: "Multimedia",
      value: userData?.stats?.total_multimedia
        ? userData?.stats?.total_multimedia + " Items"
        : "0 Items",
      image: "/images/boxorange.png",
      shadow: "0px 9.62px 28.85px 0px #FF993A66",
      path: "/home/multimedia",
    },
    {
      title: "Student List",
      value: userData?.stats?.total_students
        ? userData?.stats?.total_students + " Items"
        : "0 Items",
      image: "/images/boxorange.png",
      shadow: "0px 9.62px 28.85px 0px #FF993A66",
      path: "/student-list",
    },
  ];

  return (
    <div className="grid lg:grid-cols-12 xl:gap-10 lg:gap-5 gap-5 my-10">
      {children}
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-7">
        <p className="text-[20px] semibold">Class Information</p>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          {(role === "user" ? card : card2).map((item: CardItem, index) => (
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
              {/* {role === "user" && item?.percentage && (
                <Progress
                  type="circle"
                  strokeColor="#fff"
                  strokeWidth={8}
                  className="!text-white"
                  size={80}
                  percent={item?.percentage}
                />
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
