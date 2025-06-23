import { Input } from "antd";
import HomeLayout from "../component/shared/HomeLayout";

const students = [
  {
    image: "/images/video.png",
    title: "Sama Veda",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
  {
    image: "/images/video.png",
    title: "Sama Veda",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
  {
    title: "Class Update Form",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
  {
    image: "/images/video.png",
    title: "Sama Veda",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
  {
    title: "Class Update Form",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
  {
    image: "/images/video.png",
    title: "Sama Veda",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
];

function Multimedia() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex justify-between items-center">
          <p className="text-[30px] semibold">Multimedia</p>
          <div className="flex gap-5 items-center">
            <div>
              <img className="w-[25px]" src="/icons/filter.png" />
            </div>
            <Input
              placeholder="Search"
              className={`search-input h-[35px] lg:w-[227.28px]`}
              style={{
                borderRadius: 6,
                backgroundColor: "#F5F4F9",
                border: "none",
              }}
              prefix={<img className="w-[20px]" src="/icons/search.png" />}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 my-10">
          {students.map((item, index) => (
            <div key={index} className=" overflow-hidden rounded-xl">
              <div
                className={`rounded-xl bg-[#F1F2F1] p-4 text-center h-full flex flex-col justify-center`}
              >
                {item.image ? (
                  <img className="mx-auto" src={item.image} alt="" />
                ) : (
                  <img
                    className="w-[81.96px] h-[81.96px] mb-5 mx-auto"
                    src="/icons/pdf.png"
                    alt=""
                  />
                )}

                <h3 className="mt-2 semibold text-[18px]">{item.title}</h3>
                <p className="text-[10px] regular">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Multimedia;
