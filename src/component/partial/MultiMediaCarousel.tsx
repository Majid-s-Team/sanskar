import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useEffect, useRef, useState } from "react";
// import "swiper/css/effect-coverflow";
import ReactPlayer from "react-player";
import ViewDetails from "../shared/ViewDetails";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "lucide-react";
import { getFileIcon } from "../../helper";

export default function MultiMediaCarousel({ ...props }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [record, setRecord] = useState<any | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

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

  const handleView = (item: any) => {
    setOpen2(true);
    setRecord(item);
  };

  const openAttachment = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  const validVideoTypes = [".mp4", ".mov", ".mkv", ".avi", ".webm"];

  const isVideo = (url: string) =>
    validVideoTypes.some((ext) => url?.includes(ext));

  return (
    <div className="relative w-[90%] mx-auto py-10 flex items-center">
      {/* Left Arrow */}
      {/* <button className="swiper-button-prev absolute -left-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <LeftOutlined />
      </button> */}
      <button
        disabled={activeIndex === 0}
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute -left-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center ${activeIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <LeftOutlined />
      </button>
      <Swiper
        modules={[EffectCoverflow]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        initialSlide={0}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false, // ✅ Prevent visual bugs on edges
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        slideToClickedSlide={false}
        // navigation={{
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // }}
        // navigation={{
        //   prevEl: prevRef.current,
        //   nextEl: nextRef.current,
        // }}
        // onBeforeInit={(swiper) => {
        //   // @ts-ignore
        //   swiper.params.navigation.prevEl = prevRef.current;
        //   // @ts-ignore
        //   swiper.params.navigation.nextEl = nextRef.current;
        // }}
        className="w-full"
      >
        {props?.data?.map((item: any, index: number) => {
          const Icon = getFileIcon(item.url);
          return (
            // <SwiperSlide
            //   key={index}
            //   className="w-[297.83px] h-[297.83px] transition-all duration-300 overflow-hidden rounded-xl"
            // >
            <SwiperSlide
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className="w-[297.83px] h-[297.83px] transition-all duration-300 overflow-visible rounded-xl"
            >
              {/* <div
                className={`rounded-xl p-4 text-center h-full flex flex-col justify-center ${
                  index === activeIndex
                    ? "bg-[#F89431] text-white scale-145 shadow-[0px_4px_4px_0px_rgba(245,223,201)] z-10"
                    : "bg-[#F1F2F1] "
                }`}
              > */}
              <div
                className={`rounded-xl p-4 text-center h-full w-full flex flex-col justify-center ${
                  index === activeIndex
                    ? "bg-[#F89431] text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
                    : "bg-[#F1F2F1]"
                }`}
              >
                <h3 className="mt-2 medium text-[18px] capitalize">
                  {item.title}
                </h3>
                <p className="text-[12px] regular capitalize">
                  {item.description}
                </p>
                <div className="flex justify-center mt-4 items-center">
                  {isVideo(item.url) ? (
                    <ReactPlayer
                      width="100%"
                      // height={"100%"}
                      controls
                      src={item.url}
                    />
                  ) : item.attachment_url ? (
                    <Link
                      className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                      size={60}
                      onClick={(e) => {
                        e.stopPropagation();
                        openAttachment(item.attachment_url);
                      }}
                    />
                  ) : (
                    <Icon
                      size={60}
                      className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(item.url);
                      }}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <button className="swiper-button-next absolute -right-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <RightOutlined />
      </button> */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={activeIndex === props.data.length - 1}
        className={`absolute -right-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center ${activeIndex === props.data.length - 1 ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <RightOutlined />
      </button>
      {open2 && (
        <ViewDetails
          open={open2}
          onClose={() => setOpen2(false)}
          data={record}
        />
      )}
    </div>
  );
}
