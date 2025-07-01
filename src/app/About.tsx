import HomeLayout from "../component/shared/HomeLayout";
import { Link } from "react-router-dom";
import { getStorageData } from "../helper";

const setting = [
  {
    title: "TERMS & CONDITIONS",
    path: "/about/terms-conditions",
  },
  {
    title: "PRIVACY POLICY",
    path: "/about/privacy-policy",
  },
  {
    title: "FAQs",
    path: "/about/faqs",
  },
];

function About() {
  const role = getStorageData("role");
  return (
    <HomeLayout>
      <p className="text-[40px] semibold">About</p>
      {role === "teacher" && (
        <Link
          to="/about/teacher-manual"
          key="teacher-specific-item"
          className="flex items-center gap-5 mt-5 bg-white p-5 rounded-[20px]"
        >
          <img className="w-[40px]" src={"/icons/about-black.png"} alt="" />
          <div>
            <p className="text-[24px] bold !text-[#333342]">Teachers Manual</p>
          </div>
        </Link>
      )}
      {setting.map((item, index) => {
        return (
          <Link
            to={item.path}
            key={index}
            className="flex items-center gap-5 mt-5 bg-white p-5 rounded-[20px]"
          >
            <img className="w-[40px]" src={"/icons/about-black.png"} alt="" />
            <div>
              <p className="text-[24px] bold !text-[#333342]">{item.title}</p>
            </div>
          </Link>
        );
      })}
    </HomeLayout>
  );
}

export default About;
