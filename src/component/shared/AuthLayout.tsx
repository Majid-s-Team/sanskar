import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRequest } from "../../hooks";

type AuthlayoutProps = {
  children: React.ReactNode;
  role?: "user" | "teacher";
  setRole?: (role: "user" | "teacher") => void | undefined;
  path?: string;
};

function Authlayout({ children, role, setRole, path }: AuthlayoutProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 1024;

  const { data } = useRequest<any>("/registration/status", "GET", {
    type: "mount",
  });

  const changeRole = (role: "user" | "teacher") => {
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
          {/* <img className="w-[150px] mb-10" src="/images/logo.png" alt="" /> */}
          <p className="text-white text-[30px] bold">Sanskar Academy</p>
        </Link>
        <div className="grid lg:grid-cols-12 lg:h-[378px]">
          <div className="lg:col-span-8 col-span-12 flex flex-col justify-center lg:pl-10 ">
            <p className="text-white text-[29px] medium">
              {pathname === "/signup" ? "Sign up for" : "Sign in to"}
            </p>
            <p className="text-white text-[33px] bold">
              {pathname === "/signup" ? "Gurukul Classes" : "Sanskar Academy"}
            </p>
            {pathname === "/signup" ? (
              <p className="text-white text-[13px] light lg:w-[300px]">
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, */}
              </p>
            ) : (
              <p className="text-white text-[18px] light space-y-2">
                Choose your interface <br /> to proceed
              </p>
            )}
          </div>
          {/* <div className="lg:col-span-6 relative">
            <img
              className="xl:w-[434px] absolute xl:bottom-0 lg:block hidden"
              src="/images/auth-img.png"
              alt=""
            />
          </div> */}
        </div>
        <div className="mt-20 lg:mx-[60px] grid lg:grid-cols-2">
          <div>
            <p className="text-[18px] mb-6 r">Login as</p>
            <div className="flex space-x-1">
              {[
                { name: "Parent", val: "user" },
                { name: "Teacher", val: "teacher" },
              ].map((roleName) => (
                <div
                  key={roleName.val}
                  onClick={
                    path === "/login"
                      ? () => changeRole(roleName.val as "teacher" | "user")
                      : () =>
                          setRole && setRole(roleName.val as "teacher" | "user")
                  }
                  className={`cursor-pointer h-40 p-4 rounded-xl flex flex-col justify-center text-center transition-all duration-500 ease-in-out transform w-[150px] ${
                    role === roleName.val
                      ? "bg-[#D57D25] text-white scale-110 translate-y-[-6px] shadow-[0px_4px_4px_0px_rgba(245,223,201)] border-2 border-white"
                      : "bg-[#FFEDDC] text-black scale-95 translate-y-0"
                  }`}
                >
                  <img
                    src={`/images/${
                      roleName.val === "user" ? "parent" : "teacher"
                    }.png`}
                    className="rounded-full w-14 h-14 mx-auto mb-2"
                  />
                  <p
                    className={`text-[18px] capitalize ${
                      role === roleName.val ? "medium" : "regular"
                    }`}
                  >
                    {roleName.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {pathname === "/signup" && (
            <div className="w-full space-y-4">
              <p className="text-black text-[15px] light space-y-2">
                Welcome to our new website and new registration process. At this
                time, registration is open only for returning students. If you
                are a returning parent, please complete the registration for
                your student(s) by August 23rd. We look forward to another great
                year at Gurukul!
              </p>
              <p className="text-black text-[15px] light space-y-2">
                <span className="semibold">Please Note:</span> This website is
                still under development. If you have any questions or should you
                encounter any issues during registration, please contact us at
                admin@sanskaracademy.org. Thank you!
              </p>
              <p className="text-black text-[15px] light space-y-2">
                <span className="semibold">Note:</span> Be sure to attend the
                annual Parent Information Session on August 24th at 10:30 AM in
                the HSNC Main Hall.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="lg:m-[30px] py-[30px] mx-4 flex items-center justify-center lg:col-span-5">
        <div className="w-full">
          <div className="bg-white p-[30px] rounded-[40px] max-w-[500px] mx-auto shadow-lg">
            <div className="flex justify-between items-center my-[20px]">
              <p className="text-[18px] text-black regular">
                Welcome to{" "}
                <span className="text-[#D57D25] medium"> Sanskar Academy</span>
              </p>
              {data?.registration_open === true && role === "user" && (
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
