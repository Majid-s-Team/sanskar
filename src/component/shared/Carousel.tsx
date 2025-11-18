import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Student } from "../../types";

type Props = {
  data: Student[];
  setStudent: (student: Student) => void;
};

export default function MovieCarousel({ data, setStudent }: Props) {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (data.length > 1) {
      setActiveIndex(1);
      setStudent(data?.[1]);
    } else {
      setActiveIndex(0);
      setStudent(data?.[0]);
    }
  }, [data]);

  return (
    <div className="relative w-[80%] mx-auto py-10 flex items-center">
      {/* Left Arrow */}
      <button className="swiper-button-prev absolute -left-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <LeftOutlined />
      </button>

      <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={false} // ✅ infinite loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        onSlideChange={(swiper) => {
          const currentIndex = swiper.realIndex;
          const currentStudent = data?.[currentIndex];
          setActiveIndex(currentIndex);
          setStudent(currentStudent || data?.[1]);
        }}
        slideToClickedSlide={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        initialSlide={activeIndex}
        className="lg:w-full"
      >
        {data?.map((item: Student, index: number) => (
          <SwiperSlide
            key={index}
            className="w-[150px] h-[200px] transition-all duration-300 overflow-hidden rounded-xl"
          >
            <div
              className={`rounded-xl p-4 text-center h-full flex flex-col justify-center ${
                index === activeIndex
                  ? "bg-[#D57D25] text-white scale-145 custom-shadow2"
                  : "bg-[#FFEDDC]"
              }`}
            >
              <img
                className="w-[80px] h-[80px] mx-auto rounded-full"
                src={item.profile_image || "/images/avatar.png"}
                alt=""
              />
              <h3 className="mt-2 text-[15px] medium capitalize truncate">
                {item.first_name + " " + item.last_name}
              </h3>
              {item.is_payment_done === null ||
                (item.is_payment_done === 0 && (
                  <p className="text-[12px] regular">Payment Pending</p>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Arrow */}
      <button className="swiper-button-next absolute -right-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <RightOutlined />
      </button>
    </div>
  );
}
