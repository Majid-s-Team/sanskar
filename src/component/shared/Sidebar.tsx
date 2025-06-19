import { Menu, MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../config";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return (
    <div className="flex flex-col bg-[#D57D25]">
      <Link to="/home" className="cursor-pointer">
        <img
          className="w-[180px] mx-auto py-5"
          src="/images/logo2.png"
          alt="Logo"
        />
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className="bg-transparent border-none flex flex-col gap-6"
        items={sidebarLinks.map((item) => {
          const isActive = location.pathname === item.key;

          // ||
          // location.pathname.startsWith(`${item.key}/`);

          return {
            ...item,
            label: (
              <p
                className={`text-[15px] ${
                  isActive ? "text-[#D57D25] medium" : "text-white light"
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
        onClick={handleClick}
      />
    </div>
  );
};
