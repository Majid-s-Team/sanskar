import HomeLayout from "../component/shared/HomeLayout";

const setting = [
  {
    title: "Parent's Profile",
    icon: "/icons/profile.png",
    path: "/parents-profile",
  },
  {
    title: "Students Information",
    icon: "/icons/student-card.png",
    path: "/students-info",
  },
  {
    title: "Re-Registration Form",
    icon: "/icons/form.png",
    path: "/re-registration-form",
  },
  {
    title: "About",
    icon: "/icons/about.png",
    path: "/about",
  },
];

function Setting() {
  return (
    <HomeLayout>
      <div className="p-5">
        <p className="text-[30px] semibold">Settings</p>
        {setting.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-5 mt-5 bg-white p-5 rounded-[20px]"
            >
              <img className="w-[50px]" src={item.icon} alt="" />
              <div>
                <p className="text-[24px] bold">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default Setting;
