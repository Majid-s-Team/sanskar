import { Avatar } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { getStorageData } from "../../helper";

function ProfileDropdown() {
  const { user } = useAuth();
  const role = getStorageData("role");
  // Media query for responsive layout: max-width 768px (mobile)
  // const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <div className="flex items-center gap-2">
      <Link to="/notifications">
        <Avatar size={50} src={"/icons/notification.png"} />
      </Link>
      <Link to={`${role === "parent" ? "/parents-profile" : "/settings"}`}>
        <Avatar size={50} src={user?.image_url || "/images/user.png"} />
      </Link>
    </div>
  );
}

export default ProfileDropdown;
