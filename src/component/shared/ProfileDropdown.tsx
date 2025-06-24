import { Avatar } from "antd";
import { useAuth } from "../../hooks/useAuth";

function ProfileDropdown() {
  const { user } = useAuth();
  // Media query for responsive layout: max-width 768px (mobile)
  // const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="flex items-center gap-2">
      <Avatar size={50} src={"/icons/notification.png"} />
      <Avatar size={50} src={user?.image_url || "/images/user.png"} />
    </div>
  );
}

export default ProfileDropdown;
