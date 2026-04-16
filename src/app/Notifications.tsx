import dayjs from "dayjs";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeLayout from "../component/shared/HomeLayout";
import { useAuth, useRequest } from "../hooks";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";

dayjs.extend(relativeTime);

function Notifications() {
  const { user } = useAuth();
  const {
    data: notifications,
    loading,
    execute,
  } = useRequest<any>("/notifications", "GET", {
    type: "delay",
  });

  useEffect(() => {
    if (user) {
      execute({
        type: "mount",
        params: { type: user?.roles?.[0] },
      });
    }
  }, [user]);

  return (
    <HomeLayout loading={loading}>
      <p className="text-[40px] semibold">Notifications</p>
      {/* <div className="bg-white rounded-[8px] mt-5">
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            <span className="bold text-[#333342]">New Gurukul</span> prayer
            audio uploaded
          </p>
          <p className="text-[13px] regular text-[#666C7E]">5 days ago</p>
        </div>
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            New event added
            <span className="bold text-[#333342]"> School trip</span>
          </p>
          <p className="text-[13px] regular text-[#666C7E]">1 month ago</p>
        </div>
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            Congratulations! Successful
            <span className="bold text-[#333342]"> re-registration</span>
          </p>
          <p className="text-[13px] regular text-[#666C7E]">1 month ago</p>
        </div>
      </div> */}
      <div className="bg-white rounded-[8px] mt-5">
        {notifications?.map((item: any) => {
          const n = item.notification;

          return (
            <div
              key={item.id}
              className={`p-8 border-b border-[#F5F4F9] ${
                !item.is_read ? "bg-[#F9FAFF]" : ""
              }`}
            >
              <p className="text-[13px] text-[#666C7E]">
                <span className="bold text-[#333342]">{n.title}</span> {n.body}
              </p>

              <p className="text-[13px] text-[#666C7E]">
                {dayjs(item.created_at).fromNow()}
              </p>
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(Notifications);
