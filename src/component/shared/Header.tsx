import { Header as AntHeader } from "antd/es/layout/layout";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import ProfileDropdown from "./ProfileDropdown";
function Header({ drawerVisible, setDrawerVisible }: any) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
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
      <Input
        placeholder="Search"
        className={`search-input h-[45px] xl:w-[500px] lg:w-[350px] w-[250px]`}
        style={{
          borderRadius: 12,
          backgroundColor: "#FFFFFF",
          border: "none",
        }}
        prefix={<img className="w-[20px]" src="/icons/search.png" />}
      />
      <div className=" lg:w-full flex justify-end">
        <ProfileDropdown />
      </div>
    </AntHeader>
  );
}

export default Header;
