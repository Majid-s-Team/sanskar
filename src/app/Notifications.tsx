import dayjs from "dayjs";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeLayout from "../component/shared/HomeLayout";
import { useNotificationRedirect, useRequest } from "../hooks";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function Notifications() {
  const handleRedirect = useNotificationRedirect();
  const { data: notifications, loading } = useRequest<any>(
    "/notifications",
    "GET",
    {
      type: "mount",
      params: { type: "user" },
    },
  );

  return (
    <HomeLayout loading={loading}>
      <p className="text-[40px] semibold">Notifications</p>
      <div className="bg-white rounded-[8px] mt-5">
        {notifications?.map((item: any) => {
          const n = item.notification;

          return (
            <div
              key={item.id}
              className={`p-8 border-b border-[#F5F4F9] cursor-pointer ${
                !item.is_read ? "bg-[#F9FAFF]" : ""
              }`}
              onClick={() => handleRedirect(item)}
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
