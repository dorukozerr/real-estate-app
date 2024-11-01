"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

export const CardsSlider = () => {
  return (
    <div className="h-full w-full">
      <div className="mx-auto h-[400px] w-[300px] lg:h-[50vh] lg:w-[80vw]">
        <Swiper
          className="h-full w-full"
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[EffectCards]}
          effect="cards"
        >
          {[0, 0, 0, 0].map((slide, index) => (
            <SwiperSlide
              key={`slide-${index}`}
              className="h-full w-full rounded-md border backdrop-blur"
            >
              <div className="flex h-full w-full items-center justify-center border">
                <div className="relative h-full flex-1 border">
                  <div className="h-full w-full overflow-hidden">
                    <Swiper
                      onMouseEnter={(e) => e.stopPropagation()}
                      className="h-[200px] w-[300px] lg:h-[50vh] lg:w-[40vw]"
                    >
                      <SwiperSlide onMouseEnter={(e) => e.stopPropagation()}>
                        Vertical Slide 1
                      </SwiperSlide>
                      <SwiperSlide onMouseEnter={(e) => e.stopPropagation()}>
                        Vertical Slide 2
                      </SwiperSlide>
                      <SwiperSlide onMouseEnter={(e) => e.stopPropagation()}>
                        Vertical Slide 3
                      </SwiperSlide>
                      <SwiperSlide onMouseEnter={(e) => e.stopPropagation()}>
                        Vertical Slide 4
                      </SwiperSlide>
                      <SwiperSlide onMouseEnter={(e) => e.stopPropagation()}>
                        Vertical Slide 5
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="h-full flex-1 border border-green-500"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
