import { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";

function Faqs() {
  const [activeKey, setActiveKey] = useState<string | null>("1");

  const { data, loading } = useRequest<any[]>("/static-content", "GET", {
    type: "mount",
    params: { type: "faq" },
  });

  const toggle = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <HomeLayout loading={loading}>
      <p className="text-[40px] font-semibold mb-5">FAQs</p>
      <div className="mb-5">
        {data?.length === 0 && (
          <p className="text-[16px] regular text-[#333342]">No data found</p>
        )}
      </div>
      <div className="space-y-4">
        {data?.map((item) => {
          const isActive = item.id === activeKey;
          return (
            <div
              key={item.key}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                isActive ? "bg-[#D57D25] text-white" : "bg-white text-black"
              }`}
            >
              {/* Header */}
              <div
                className="flex justify-between items-center cursor-pointer p-4 select-none"
                onClick={() => toggle(item.id)}
              >
                <span className="medium text-base capitalize">
                  {item.question}
                </span>
                <CaretRightOutlined
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {/* Animated Content with Scale + Fade */}
              <div
                className={`transition-all duration-500 ease-in-out transform capitalize ${
                  isActive
                    ? "opacity-100 scale-100 p-4 pt-0"
                    : "opacity-0 scale-95 h-0 p-0"
                }`}
              >
                <p className="text-sm">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(Faqs);
