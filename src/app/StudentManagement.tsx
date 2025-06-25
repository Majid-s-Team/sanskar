import { useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import { Avatar } from "antd";

function StudentManagement() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <HomeLayout>
      <p className="text-[30px] semibold">Student Management</p>
      {[1, 2, 3, 4].map((_, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            onClick={() => handleToggle(index)}
            key={index}
            className={`!w-full mt-5 bg-white p-5 rounded-[20px] transition-all duration-500 cursor-pointer ${
              isOpen
                ? "flex flex-col items-center"
                : "flex items-center justify-between "
            }`}
          >
            <div
              className={`transition-all duration-500 ${
                isOpen
                  ? "text-center space-y-5 mb-5"
                  : "flex items-center gap-5"
              }`}
            >
              <Avatar size={80} src="/images/teacher.png" />
              <div className={isOpen ? "space-y-1" : ""}>
                <p className="text-[16px] semibold">Jane Cooper</p>
                <p className="text-[12px] regular">+011 384 792302</p>
                <p className="text-[12px] regular">janecooper@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <img className="w-[40px]" src="/icons/chat.png" alt="" />
              <img className="w-[40px]" src="/icons/call.png" alt="" />
            </div>

            {isOpen && (
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-[200px] mt-10 px-20" : "max-h-0"
                } w-full`}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-[20px] semibold">Date Of Birth</p>
                    <p className="text-[20px] regular">08/08/2015</p>
                  </div>
                  <div>
                    <p className="text-[20px] semibold">School Name</p>
                    <p className="text-[20px] regular">The School</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </HomeLayout>
  );
}

export default StudentManagement;
