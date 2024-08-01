import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
//  EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFade, EffectFlip
const sildes = [
  { img: "/images/home2.jpg" },
  { img: "/images/home1.jpg" },
  { img: "/images/home3.jpg" },
  { img: "/images/home6.jpg" },
  { img: "/images/home5.jpg" },
  { img: "/images/home7.jpg" },
  { img: "/images/home8.jpg" },
];

const SwiperComponent = () => {
  return (
    <div className="!h-full max-h-screen !absolute !top-0 !left-0 !w-full !z-0">
      <Swiper
        effect="fade"
        speed={2000}
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        className="h-full  max-h-screen  w-full  opacity-50"
        wrapperClass="w-full  max-h-screen  h-full !object-contain"
        spaceBetween={50}
        slidesPerView={1}
      >
        {sildes.map((slide: any, key: number) => {
          return (
            <SwiperSlide key={key} className="!w-full h-full max-h-screen ">
              <img
                src={slide.img}
                alt=""
                className={`w-full h-full object-cover  max-h-screen `}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
