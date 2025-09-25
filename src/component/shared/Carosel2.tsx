import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlickCarousel({ data }: any) {
  const [active, setActive] = useState(0);

  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 500,
    beforeChange: (_: any, next: number) => setActive(next),
    afterChange: (currentSlide: number) => setActive(currentSlide),
  };

  return (
    <div className="w-[80%] mx-auto py-10">
      <Slider {...settings} className="!w-full">
        {data?.map((item: any, i: number) => (
          <div
            key={i}
            className="!w-[150px] !h-[200px] transition-all duration-300 overflow-hidden rounded-xl"
          >
            <div
              className={`flex flex-col items-center p-5 rounded-2xl transition-all duration-300 ${
                i === active
                  ? "bg-[#D57D25] text-white scale-145 custom-shadow2"
                  : "bg-orange-100 scale-90 opacity-80"
              }`}
              onClick={() => setActive(i)}
            >
              <img
                src={item.profile_image}
                alt={item.first_name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <p
                className={`mt-2 text-sm font-medium ${
                  i === active ? "text-white" : "text-black"
                }`}
              >
                {item.first_name + " " + item.last_name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
