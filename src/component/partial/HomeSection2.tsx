import { Progress } from "antd";
import { useNavigate } from "react-router-dom";
import { card2, card } from "../../config";

interface CardItem {
  title: string;
  value: string;
  image: string;
  shadow: string;
  path: string;
  percentage?: number; // add this property
}

function HomeSection2({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-12 xl:gap-10 lg:gap-5 gap-5 my-10">
      {children}
      <div className="bg-white p-5 rounded-[26.61px] lg:col-span-7">
        <p className="text-[20px] semibold">Class Information</p>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          {(role === "user" ? card : card2).map((item: CardItem, index) => (
            <div
              onClick={() => navigate(item.path, { state: 1 })}
              key={index}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "100% 100%",
                boxShadow: item.shadow,
                height: "200px",
              }}
              className="p-6 gap-4 rounded-[20px] space-y-3 cursor-pointer"
            >
              <div>
                <p className="text-white text-[20px] semibold">{item.title}</p>
                <p className="text-white text-[14px] medium">{item.value}</p>
              </div>
              {role === "user" && item?.percentage && (
                <Progress
                  type="circle"
                  strokeColor="#fff"
                  strokeWidth={8}
                  className="!text-white"
                  size={80}
                  percent={item?.percentage}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeSection2;
