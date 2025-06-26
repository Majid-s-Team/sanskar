import { Link } from "react-router-dom";
import Carousel from "../shared/Carousel";

function HomeSection1({ role }: { role: string }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="grid lg:grid-cols-12 bg-white p-5 rounded-[20.15px]">
        <div className="lg:col-span-5">
          <p className="text-[20px] semibold">Hey Alice.</p>
          <p className="text-[#797979] text-[14px] light">
            Welcome back! We're here to support you on your learning journey.
            Dive into your classes and keep progressing towards your goals
          </p>
        </div>
        <div className="lg:col-span-7 mx-auto">
          <img
            className="w-[300px] h-[300px] lg:mt-[-40px] object-fit"
            src="/images/human.png"
            alt=""
          />
        </div>
      </div>
      {role === "parent" ? (
        <div className="bg-white p-5 rounded-[20.15px] ">
          <Link
            to={"/forms/add-student"}
            className="float-right px-8 mb-5 h-[38.4px] flex justify-center items-center !bg-[#FF881A] rounded-[10px] !border-none text-[16px] medium !text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
          >
            Add Student
          </Link>
          <div className="flex justify-center items-center lg:w-full w-[330px]">
            <Carousel />
          </div>
        </div>
      ) : (
        <Link
          to={"/archived"}
          style={{
            backgroundImage: "url(/images/orange-card.png)",
            backgroundSize: "100% 100%",
            boxShadow: "0px 9.06px 27.18px 0px #FF993A66",
            borderRadius: "28px",
          }}
          className="p-5 rounded-[20.15px] flex justify-center flex-col gap-5 items-center"
        >
          <img className="w-[72px]" src="/icons/wallet.png" alt="" />
          <p className="text-white text-[30px] semibold">View Archives</p>
        </Link>
      )}
    </div>
  );
}

export default HomeSection1;
