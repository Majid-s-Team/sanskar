import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type AuthlayoutProps = {
  children: React.ReactNode;
  role?: "parent" | "teacher";
  setRole?: (role: "parent" | "teacher") => void | undefined;
  path?: string;
};

function Authlayout({ children, role, setRole, path }: AuthlayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 1024;

  const changeRole = (role: "parent" | "teacher") => {
    setRole && setRole(role);
    navigate("/login");
  };
  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg.png)",
        backgroundSize: isMobile ? "cover" : "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 "
    >
      <div className="p-10 h-full lg:col-span-7">
        <Link to="/login">
          <img className="w-[150px] mb-10" src="/images/logo.png" alt="" />
        </Link>
        <div className="grid lg:grid-cols-12 lg:h-[378px]">
          <div className="lg:col-span-6 col-span-12 flex flex-col justify-center lg:pl-10 ">
            <p className="text-white text-[29px] medium">
              {pathname === "/signup" ? "Sign up" : "Sign in"} to
            </p>
            <p className="text-white text-[33px] bold">SANSKAR!</p>
            {pathname === "/signup" ? (
              <p className="text-white text-[13px] light lg:w-[300px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            ) : (
              <p className="text-white text-[18px] light">
                Choose your interface <br /> to proceed
              </p>
            )}
          </div>
          <div className="lg:col-span-6 relative">
            {/* <img
              className="xl:w-[434px] absolute xl:bottom-0 lg:block hidden"
              src="/images/auth-img.png"
              alt=""
            /> */}
          </div>
        </div>
        <div className="mt-20 lg:mx-[60px]">
          <p className="text-[18px] mb-6 r">Login as</p>
          <div className="flex space-x-1">
            {["parent", "teacher"].map((roleName) => (
              <div
                key={roleName}
                onClick={
                  path === "/login"
                    ? () => changeRole(roleName as "parent" | "teacher")
                    : () => setRole && setRole(roleName as "parent" | "teacher")
                }
                className={`cursor-pointer h-40 p-4 rounded-xl flex flex-col justify-center text-center transition-all duration-500 ease-in-out transform w-[150px] ${
                  role === roleName
                    ? "bg-[#D57D25] text-white scale-110 translate-y-[-6px] shadow-[0px_4px_4px_0px_rgba(245,223,201)] border-2 border-white"
                    : "bg-[#FFEDDC] text-black scale-95 translate-y-0"
                }`}
              >
                <img
                  src={`/images/${roleName}.png`}
                  alt={roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                  className="rounded-full w-14 h-14 mx-auto mb-2"
                />
                <p
                  className={`text-[18px] capitalize ${
                    role === roleName ? "medium" : "regular"
                  }`}
                >
                  {roleName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:m-[30px] py-[30px] mx-4 flex items-center justify-center lg:col-span-5">
        <div className="w-full">
          <div className="bg-white p-[30px] rounded-[40px] max-w-[500px] mx-auto shadow-lg">
            <div className="flex justify-between items-center my-[20px]">
              <p className="text-[18px] text-black regular">
                Welcome to{" "}
                <span className="text-[#D57D25] medium"> Sanskar</span>
              </p>
              {role === "parent" && (
                <p className="text-[13px] text-[#8D8D8D] regular">
                  {path === "/login" ? "Have an Account" : "No Account"} ?
                  <br />
                  <Link className="text-[#D57D25]" to={path || ""}>
                    {" "}
                    {path === "/login" ? "Sign in" : "Sign up"}
                  </Link>
                </p>
              )}
            </div>
            <p className="text-[50px] text-black medium mb-5">
              {path === "/login" ? "Sign up" : "Sign in"}
            </p>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Authlayout);
