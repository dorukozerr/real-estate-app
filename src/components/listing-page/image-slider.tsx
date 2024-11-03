"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { imageFormatConverter } from "@/lib/imagekitio-image-optimizer";

export const ImageSlider = ({ imageUrls }: { imageUrls: string[] }) => (
  <Swiper
    className="h-full w-full"
    spaceBetween={0}
    slidesPerView={1}
    pagination={true}
    navigation={true}
    modules={[Pagination, Navigation]}
  >
    {imageUrls.map((url, urlIndex) => {
      const convertionFormat = {
        w: 800,
        q: 100,
        f: "webp",
      };

      const convertedImgUrl = imageFormatConverter(url, convertionFormat);

      return (
        <SwiperSlide className="h-full w-full" key={`swiperSlide-${urlIndex}`}>
          <Image
            src={convertedImgUrl}
            style={{ objectFit: "cover" }}
            priority={true}
            alt="Property Image"
            fill={true}
            sizes="100%"
          />
        </SwiperSlide>
      );
    })}
  </Swiper>
);
