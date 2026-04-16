import { Header as AntHeader } from "antd/es/layout/layout";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ProfileDropdown from "./ProfileDropdown";
import { useLocation, useNavigate } from "react-router-dom";
function Header({ drawerVisible, setDrawerVisible }: any) {
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const { pathname } = useLocation();
  return (
    <AntHeader
      style={{ padding: 0 }}
      className="flex items-center justify-between lg:!px-6 !bg-transparent h-[95px] gap-4 "
    >
      {isMobile && (
        <Button
          type="text"
          icon={<MenuUnfoldOutlined style={{ color: "black" }} />}
          onClick={() => setDrawerVisible(!drawerVisible)}
          style={{
            fontSize: "16px",
            // width: 60,
            height: 64,
          }}
        />
      )}
      {pathname !== "/home" && (
        <img
          onClick={() => navigate(-1)}
          className="w-[45px] rounded-[12px]"
          style={{
            cursor: "pointer",
            boxShadow: "2px 4px 4px 0px #0000001A",
          }}
          src="/icons/arrow-left.png"
          alt="Logo"
        />
      )}

      <div className=" lg:w-full flex justify-end">
        <ProfileDropdown />
      </div>
    </AntHeader>
  );
}

export default Header;
