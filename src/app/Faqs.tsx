import { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import HomeLayout from "../component/shared/HomeLayout";

const faqData = [
  {
    key: "1",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    answer: `Notice that we don’t ask “do I”, but “Why do I”. This leaves people no out. Even phrasing the question this way reassures people that this is a service that they need. Now is your chance to elaborate on the why by pointing out all of the things that you do. Namely, focus on how buying and selling properties is your job and you’ve been doing it for years. You can take all the stress off people’s plates, etc. `,
  },
  {
    key: "2",
    question: "This is panel header 2",
    answer: `This is the answer for panel 2.`,
  },
  {
    key: "3",
    question: "This is panel header 3",
    answer: `This is the answer for panel 3.`,
  },
];

function Faqs() {
  const [activeKey, setActiveKey] = useState<string | null>("1");

  const toggle = (key: string) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <HomeLayout>
      <p className="text-[40px] font-semibold mb-5">FAQs</p>
      <div className="space-y-4">
        {faqData.map((item) => {
          const isActive = item.key === activeKey;
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
                onClick={() => toggle(item.key)}
              >
                <span className="medium text-base">{item.question}</span>
                <CaretRightOutlined
                  className={`transition-transform duration-300 ${
                    isActive ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>

              {/* Animated Content with Scale + Fade */}
              <div
                className={`transition-all duration-500 ease-in-out transform ${
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

export default Faqs;
