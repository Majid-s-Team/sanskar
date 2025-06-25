import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useState } from "react";
// import "swiper/css/effect-coverflow";

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
    image: "/images/video.png",
    title: "Sama Veda",
    description:
      "Aenean aliquet lectus vestibulum gravida sed vulputate vitae.",
  },
];

export default function MultiMediaCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <Swiper
      modules={[EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      loop={false}
      slidesPerView="auto"
      // loopAdditionalSlides={3} // ✅ Helps preload extra slides
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false, // ✅ Prevent visual bugs on edges
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      initialSlide={activeIndex}
      className="w-full"
    >
      {students.map((item, index) => (
        <SwiperSlide
          key={index}
          className="w-[297.83px] h-[297.83px] transition-all duration-300 overflow-hidden rounded-xl"
        >
          <div
            className={`rounded-xl p-4 text-center h-full flex flex-col justify-center ${
              index === activeIndex
                ? "bg-[#F89431] text-white scale-145 shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
                : "bg-[#F1F2F1]"
            }`}
          >
            <h3 className="mt-2 medium text-[16px]">{item.title}</h3>
            <p className="text-[10px] regular">{item.description}</p>
            <img
              className="w-[250px] h-[157.06px] mt-10 mx-auto"
              src={item.image}
              alt=""
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
