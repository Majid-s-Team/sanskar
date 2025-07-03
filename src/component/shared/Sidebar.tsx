import { Menu, MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebarLinks } from "../../config";
import LogoutPopup from "../partial/LogoutPopup";
import { useState } from "react";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sideBarLinks = useSidebarLinks();
  const [open, setOpen] = useState(false);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <div className="flex flex-col bg-[#D57D25] custom-shadow2 !h-100">
      <Link to="/home" className="cursor-pointer">
        <img
          className="w-[180px] ml-5 py-5"
          src="/images/logo2.png"
          alt="Logo"
        />
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className="bg-transparent border-none flex flex-col gap-6"
        items={sideBarLinks.map((item) => {
          const isActive = location.pathname === item.key;
          // ||
          // location.pathname.startsWith(`${item.key}/`);

          return {
            ...item,
            label: (
              <p
                className={`text-[15px] ${
                  isActive ? "text-[#D57D25] regular" : "text-white light"
                }`}
              >
                {item.label}
              </p>
            ),
            icon: (
              <img
                className="w-[24px] h-[24px]"
                src={isActive ? item.iconactive : item.icon}
                alt={item.label}
              />
            ),
          };
        })}
        onClick={(item) => {
          if (item.key === "/login") {
            setOpen(true);
          } else {
            handleClick(item);
          }
        }}
      />
      {open && <LogoutPopup open={open} setOpen={setOpen} />}
    </div>
  );
};
