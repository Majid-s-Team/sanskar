import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useEffect, useState } from "react";

// const students = [
//   {
//     image: "/images/parent.png",
//     child: "Child 2",
//   },
//   {
//     image: "/images/parent.png",
//     child: "Child 1",
//   },
//   {
//     image: "/images/parent.png",
//     child: "Child 3",
//   },
// ];

// type Props = {
//   data: any;
//   setStudent: any;
// };

export default function MovieCarousel({ data, setStudent }: any) {
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
      onSlideChange={(swiper) => {
        const currentIndex = swiper.realIndex; // ✅ current index
        const currentStudent = data?.[currentIndex]; // ✅ current student data
        setActiveIndex(currentIndex);
        setStudent(currentStudent || data?.[1]);
        console.log("Current Student:", currentStudent);
      }}
      initialSlide={activeIndex}
      className="lg:w-full"
    >
      {data?.map((item: any, index: number) => (
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
              src={item.profile_image}
              alt=""
            />
            <h3 className="mt-2 text-[15px] medium capitalize truncate">
              {item.first_name + " " + item.last_name}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
