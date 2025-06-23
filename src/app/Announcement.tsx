import HomeLayout from "../component/shared/HomeLayout";

const announcement = [
  {
    icon: "/icons/ball1.png",
    title: "Sports Day Announcement",
    description:
      "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
  },
  {
    icon: "/icons/ball2.png",
    title: "Summer Break Start Date",
    description:
      "Summer break begins on May 25, 2024. Have a wonderful holiday!",
  },
  {
    icon: "/icons/ball1.png",
    title: "Sports Day Announcement",
    description:
      "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
  },
  {
    icon: "/icons/ball2.png",
    title: "Summer Break Start Date",
    description:
      "Summer break begins on May 25, 2024. Have a wonderful holiday!",
  },
];

function Announcement() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <p className="text-[30px] semibold">Announcement</p>
        {announcement.map((form, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-5 mt-5 border border-[#ECECEC] p-2 rounded-[20px]"
            >
              <img className="w-[50px]" src={form.icon} alt="" />
              <div>
                <p className="text-[14px] medium">{form.title}</p>
                <p className="text-[12px] text-[#969696] regular">
                  {form.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default Announcement;
