import { Select } from "antd";
import AnnouncementModal from "../component/partial/AnnouncementModal";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import { useState } from "react";

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

function GurukulAnnouncements() {
  const role = getStorageData("role");
  const [open, setOpen] = useState(false);
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <p className="text-[30px] semibold">Gurukul Announcements</p>
          {role === "teacher" && (
            <div className="flex gap-5 items-center">
              <Select
                style={{
                  // width: "200px",
                  height: "48px",
                }}
                className="custom-selector w-full lg:w-[200px]"
                defaultValue={"French"}
                options={[
                  { value: "All", label: "All" },
                  { value: "Class 1", label: "Class 1" },
                ]}
              />
            </div>
          )}
        </div>
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
      {open && (
        <AnnouncementModal
          isModalOpen={open}
          handleCancel={() => setOpen(false)}
        />
      )}
    </HomeLayout>
  );
}

export default GurukulAnnouncements;
