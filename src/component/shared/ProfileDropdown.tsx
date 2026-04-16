import { Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { getStorageData } from "../../helper";
import { useAuth } from "../../hooks/useAuth";
import { useRequest } from "../../hooks";
import { useEffect } from "react";

function ProfileDropdown() {
  const { user } = useAuth();
  const role = getStorageData("role");

  const { data: notificationCount, execute } = useRequest<any>(
    "/notifications/unread-count",
    "GET",
    {},
  );

  const { execute: readAll } = useRequest<any>(
    "/notifications/read-all",
    "POST",
    {
      type: "delay",
    },
  );

  useEffect(() => {
    if (user) {
      execute({
        type: "mount",
        params: { type: user?.roles?.[0] },
      });
    }
  }, [user]);

  const count = notificationCount?.count || 0;

  const handleNotification = () => {
    readAll({
      type: "mount",
      params: { type: user?.roles?.[0] },
    });
    // execute({
    //   type: "mount",
    //   params: { type: user?.roles?.[0] },
    // });
  };

  return (
    <div className="flex items-center gap-2">
      <Link to="/notifications" onClick={handleNotification}>
        <Badge
          count={count}
          size="default"
          offset={[-8, 8]}
          showZero={false}
          overflowCount={99}
        >
          <Avatar size={50} src={"/icons/notification.png"} />
        </Badge>
      </Link>

      <Link to={`${role === "user" ? "/parents-profile" : "/settings"}`}>
        <Avatar
          size={50}
          src={
            role === "user"
              ? user?.user?.profile_image || ""
              : user?.teacher?.profile_picture || ""
          }
        />
      </Link>
    </div>
  );
}

export default ProfileDropdown;
