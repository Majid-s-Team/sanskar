import { Select } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import AuthButton from "../component/partial/AuthButton";
import { useState } from "react";
import AnnouncementModal from "../component/partial/AnnouncementModal";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";

function Announcement() {
  const { user } = useAuth();
  const role = getStorageData("role");
  const [open, setOpen] = useState(false);
  const url = role === "teacher" ? "/announcements" : "/annoucement-student";
  const { data, loading, setData } = useRequest<any>(url, "GET", {
    type: "mount",
  });

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <p className="text-[30px] semibold">Announcements</p>
          {role === "teacher" && (
            <div className="flex gap-5 items-center">
              <Select
                style={{
                  // width: "200px",
                  height: "48px",
                }}
                className="custom-selector w-full lg:w-[200px]"
                disabled
                defaultValue={user?.teacher?.gurukal.name || "French"}
                options={[]}
              />
              <AuthButton
                onClick={() => setOpen(true)}
                text="Add Announcement"
              />
            </div>
          )}
        </div>
        {data?.length > 0 ? (
          data?.map((form: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center gap-5 mt-5 border border-[#ECECEC] p-2 rounded-[20px]"
              >
                <img className="w-[50px]" src={"/icons/ball2.png"} alt="" />
                <div>
                  <p className="text-[14px] medium capitalize">{form.title}</p>
                  <p className="text-[12px] text-[#969696] regular capitalize">
                    {form.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-[18px] text-[#969696] regular text-center h-[70vh] flex items-center justify-center">
            No announcement available.
          </p>
        )}
      </div>
      {open && (
        <AnnouncementModal
          isModalOpen={open}
          handleCancel={() => setOpen(false)}
          setData={setData}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Announcement);
