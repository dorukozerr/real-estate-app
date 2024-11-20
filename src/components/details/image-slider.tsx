"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Zoom } from "swiper/modules";
import { imageFormatConverter } from "@/lib/imagekitio-image-optimizer";
import { Skeleton } from "@/components/ui/skeleton";

export const ImageSlider = ({ imageUrls }: { imageUrls: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  return (
    <div className="group flex h-full max-w-full flex-col gap-1 rounded-md border border-border p-1 transition-all hover:border-foreground">
      <Swiper
        className="h-full w-full flex-1"
        spaceBetween={0}
        slidesPerView={1}
        pagination={imageUrls.length > 1}
        navigation={imageUrls.length > 1}
        thumbs={{ swiper: thumbsSwiper }}
        zoom={true}
        loop={true}
        modules={[Pagination, Navigation, Thumbs, Zoom]}
      >
        {imageUrls.map((url, urlIndex) => {
          const convertionFormat = {
            w: 1440,
            q: 100,
            f: "webp",
          };

          const convertedImgUrl = imageFormatConverter(url, convertionFormat);

          return (
            <SwiperSlide
              className="h-full w-full"
              key={`swiperSlide-${urlIndex}`}
            >
              <div className="swiper-zoom-container h-full w-full cursor-pointer">
                {loadedImages.includes(convertedImgUrl) ? null : (
                  <Skeleton className="h-full w-full" />
                )}
                <Image
                  src={convertedImgUrl}
                  style={{
                    objectFit: "contain",
                    display: loadedImages.includes(convertedImgUrl)
                      ? "block"
                      : "none",
                  }}
                  alt={`Property Image ${urlIndex + 1}`}
                  fill={true}
                  priority={true}
                  sizes="100%"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={4}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="hidden h-[150px] w-full border-t border-border pt-1 transition-all group-hover:border-foreground md:block"
      >
        {imageUrls.map((url, urlIndex) => {
          const convertionFormat = {
            w: 1440,
            q: 100,
            f: "webp",
          };

          const convertedImgUrl = imageFormatConverter(url, convertionFormat);

          return (
            <SwiperSlide
              className="h-full w-full overflow-hidden rounded-md border border-border transition-all group-hover:border-foreground"
              key={`swiperSlideThumbnail-${urlIndex}`}
            >
              {loadedImages.includes(convertedImgUrl) ? null : (
                <Skeleton className="h-full w-full" />
              )}
              <Image
                src={convertedImgUrl}
                style={{
                  objectFit: "cover",
                  display: loadedImages.includes(convertedImgUrl)
                    ? "block"
                    : "none",
                }}
                alt={`Property Image Thumbnail ${urlIndex + 1}`}
                fill={true}
                priority={true}
                onLoad={() =>
                  setLoadedImages((prevState) => [
                    ...prevState,
                    convertedImgUrl,
                  ])
                }
                sizes="100%"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
