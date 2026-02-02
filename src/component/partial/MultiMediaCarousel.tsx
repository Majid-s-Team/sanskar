import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { useEffect, useRef, useState } from "react";
// import "swiper/css/effect-coverflow";
import ReactPlayer from "react-player";
import ViewDetails from "../shared/ViewDetails";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

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

  const openAttachment = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-[90%] mx-auto py-10 flex items-center">
      {/* Left Arrow */}
      <button className="swiper-button-prev absolute -left-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <LeftOutlined />
      </button>
      <Swiper
        modules={[EffectCoverflow, Navigation]}
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
        slideToClickedSlide={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
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
              <h3 className="mt-2 medium text-[16px] capitalize">
                {item.title}
              </h3>
              <p className="text-[10px] regular capitalize">
                {item.description}
              </p>
              {/* <img
              className="w-[250px] h-[157.06px] mt-10 mx-auto"
              src={item.image}
              alt=""
            /> */}
              {item.attachment_url ? (
                <Button onClick={() => openAttachment(item.attachment_url)}>
                  Open Attachment
                </Button>
              ) : validVideoTypes.some((type) => item.url?.includes(type)) ? (
                <ReactPlayer
                  width={"100%"}
                  // className="w-[250px] h-[157.06px] mt-10 mx-auto"
                  controls
                  src={
                    item.url || "https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  }
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
      <button className="swiper-button-next absolute -right-14 top-1/2 -translate-y-1/2 z-10 text-black bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center">
        <RightOutlined />
      </button>
    </div>
  );
}
