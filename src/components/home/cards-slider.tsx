"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { imageFormatConverter } from "@/lib/imagekitio-image-optimizer";
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CardsSlider = ({ properties }: { properties: Property[] }) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [width, setWidth] = useState(1920);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className="h-max w-full">
      <div className="mx-auto h-[550px] w-[300px] sm:w-[500px] lg:h-[min(400px,90vh)] lg:w-[min(900px,75vw)]">
        <Swiper
          className="h-full w-full"
          spaceBetween={0}
          slidesPerView={1}
          modules={[EffectCards]}
          effect="cards"
          cardsEffect={{ perSlideOffset: 7 }}
        >
          {properties
            ?.slice(0, width > 768 ? properties.length : 5)
            .map((property) => (
              <SwiperSlide
                key={`slide-${property._id}`}
                className="h-full w-full rounded-2xl border border-border bg-background"
              >
                <div className="flex h-full w-full flex-col items-center justify-center lg:flex-row">
                  <div className="relative h-full w-full max-w-[100%] flex-[1.5] overflow-hidden rounded-t-2xl lg:max-w-[60%] lg:rounded-t-none">
                    <div className="h-full w-full overflow-hidden">
                      <Swiper
                        onMouseEnter={(e) => e.stopPropagation()}
                        className="h-full w-full"
                        pagination={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                      >
                        {property.imageUrls.map((imgUrl, imgIndex) => {
                          const convertionFormat = {
                            w: Math.min(800, width),
                            q: 50,
                            f: "webp",
                          };

                          const convertedImgUrl = imageFormatConverter(
                            imgUrl,
                            convertionFormat
                          );

                          return (
                            <SwiperSlide
                              key={`img-${property._id}-${imgIndex}`}
                              className="relative h-full w-full border-r border-border"
                              onMouseEnter={(e) => e.stopPropagation()}
                            >
                              {loadedImages.includes(
                                `${property._id}-${imgIndex}`
                              ) ? null : (
                                <Skeleton className="h-full w-full" />
                              )}
                              <Image
                                src={convertedImgUrl}
                                style={{
                                  objectFit: "cover",
                                  display: loadedImages.includes(
                                    `${property._id}-${imgIndex}`
                                  )
                                    ? "block"
                                    : "hidden",
                                }}
                                priority={true}
                                alt="Property Image"
                                fill={true}
                                sizes="100%"
                                onLoad={() =>
                                  setLoadedImages((prevState) => [
                                    ...prevState,
                                    `${property._id}-${imgIndex}`,
                                  ])
                                }
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                  <div className="flex h-full min-w-[100%] flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 lg:min-w-[40%]">
                    <h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                      {property.title}
                    </h3>
                    <h5 className="text-base font-medium text-muted-foreground sm:text-lg">
                      {property.location}
                    </h5>
                    <div className="flex items-center justify-start gap-2 sm:gap-4">
                      <span className="text-xl font-semibold text-primary sm:text-2xl">
                        {property.price.toLocaleString()} ₺
                      </span>
                      <Badge className="text-sm font-medium sm:text-base">
                        {property.roomCount}
                      </Badge>
                      <Badge className="text-sm font-medium sm:text-base">
                        {property.isForRent ? "Kiralık" : "Satılık"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-3">
                      {property.tags.slice(0, 4).map((tag, tagIndex) => (
                        <Badge
                          className="text-xs font-medium tracking-wide sm:text-sm"
                          variant="outline"
                          key={`propertyTag-${property._id}-${tagIndex}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-1" />
                    <Link href={`/property/${property._id}`} className="w-full">
                      <Button
                        className="w-full text-base font-semibold"
                        size="lg"
                      >
                        Detaylar
                      </Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
