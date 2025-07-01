import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useState } from "react";

const students = [
  {
    image: "/images/parent.png",
    child: "Child 2",
  },
  {
    image: "/images/parent.png",
    child: "Child 1",
  },
  {
    image: "/images/parent.png",
    child: "Child 3",
  },
];

export default function MovieCarousel() {
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
      className="lg:w-full"
    >
      {students.map((item, index) => (
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
            <img className="w-[80px] mx-auto" src={item.image} alt="" />
            <h3 className="mt-2 text-[15px] medium">{item.child}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
