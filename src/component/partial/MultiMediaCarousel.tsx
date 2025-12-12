import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useEffect, useRef, useState } from "react";
// import "swiper/css/effect-coverflow";
import ReactPlayer from "react-player";
import ViewDetails from "../shared/ViewDetails";

const validVideoTypes = [".mp4", ".mov", ".mkv", ".avi", ".webm"];

export default function MultiMediaCarousel({ ...props }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [record, setRecord] = useState<any | null>(null);

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (props?.data.length > 0) {
      const centerIndex = Math.floor(props?.data.length / 2);

      setActiveIndex(centerIndex);
      setTimeout(() => {
        swiperRef.current?.slideTo(centerIndex, 0); // instantly slide to center
      }, 0);
    }
  }, [props?.data]);

  const handleview = (item: any) => {
    setOpen2(true);
    setRecord(item);
  };
  return (
    <Swiper
      modules={[EffectCoverflow]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      initialSlide={0}
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
      // initialSlide={activeIndex}
      className="w-full"
    >
      {props?.data?.map((item: any, index: number) => (
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
            <h3 className="mt-2 medium text-[16px] capitalize">{item.title}</h3>
            <p className="text-[10px] regular capitalize">{item.description}</p>
            {/* <img
              className="w-[250px] h-[157.06px] mt-10 mx-auto"
              src={item.image}
              alt=""
            /> */}
            {validVideoTypes.some((type) => item.url?.includes(type)) ? (
              <ReactPlayer
                width={"100%"}
                // className="w-[250px] h-[157.06px] mt-10 mx-auto"
                controls
                src={item.url || "https://www.youtube.com/watch?v=LXb3EKWsInQ"}
              />
            ) : (
              <img
                onClick={() => handleview(item.url)}
                className="w-[81.96px] h-[81.96px] my-5 mx-auto cursor-pointer"
                src="/icons/pdf.png"
                alt=""
              />
            )}
          </div>
          {open2 && (
            <ViewDetails
              open={open2}
              onClose={() => setOpen2(false)}
              data={record}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
