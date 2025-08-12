import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import { Avatar } from "antd";
import { withAuthGuard } from "../component/higherOrder/withAuth";

const setting = [
  {
    title: "Parent's Profile",
    icon: "/icons/profile.png",
    path: "/parents-profile",
  },
  {
    title: "Students Information",
    icon: "/icons/student-card.png",
    path: "/home/student-info",
  },
  // {
  //   title: "Re-Registration Form",
  //   icon: "/icons/form.png",
  //   path: "/re-registration-form",
  // },
  // {
  //   title: "About",
  //   icon: "/icons/about.png",
  //   path: "/about",
  // },
];

// const setting2 = [
//   // {
//   //   title: "Edit Profile",
//   //   icon: "/icons/profile.png",
//   //   path: "",
//   // },
//   // {
//   //   title: "About",
//   //   icon: "/icons/about.png",
//   //   path: "/about",
//   // },
// ];

function Setting() {
  const role = getStorageData("role");
  return (
    <HomeLayout>
      {role === "parent" ? (
        <>
          <p className="text-[40px] semibold">Settings</p>
          {setting.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className="flex items-center gap-5 mt-5 bg-white p-5 rounded-[20px]"
              >
                <img className="w-[50px]" src={item.icon} alt="" />
                <div>
                  <p className="text-[24px] bold !text-[#333342]">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </>
      ) : (
        <div className="bg-white p-5 rounded-[24.59px]">
          <div className={`flex flex-col items-center text-center my-10`}>
            <Avatar size={143} src="/images/teacher.png" />
            <div>
              <p className="text-[28px] semibold">Jane Cooper</p>
              <p className="text-[20px] regular">+011 384 792302</p>
              <p className="text-[20px] regular">janecooper@gmail.com</p>
            </div>
          </div>
          {/* {setting2.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className="flex items-center gap-5 mt-5 border border-[#CCCCCC] p-5 rounded-[20px]"
              >
                <img className="w-[50px]" src={item.icon} alt="" />
                <div>
                  <p className="text-[24px] bold !text-[#333342]">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })} */}
        </div>
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Setting);
