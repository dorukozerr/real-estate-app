"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CardsSlider = ({ properties }: { properties: Property[] }) => {
  return (
    <div className="h-max w-full">
      <div className="mx-auto h-[min(400px,90vh)] w-[min(900px,80vw)]">
        <Swiper
          className="h-full w-full"
          spaceBetween={0}
          slidesPerView={1}
          modules={[EffectCards]}
          effect="cards"
          cardsEffect={{ perSlideOffset: 7 }}
        >
          {properties?.map((property) => {
            console.log("property =>", property);

            return (
              <SwiperSlide
                key={`slide-${property._id}`}
                className="h-full w-full rounded-2xl border-8 border-border bg-background"
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-full max-w-[60%] flex-[1.5]">
                    <div className="h-full w-full overflow-hidden">
                      <Swiper
                        onMouseEnter={(e) => e.stopPropagation()}
                        className="h-full w-full"
                        pagination={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                      >
                        {property.imageUrls.map((img, imgIndex) => (
                          <SwiperSlide
                            key={`img-${property._id}-${imgIndex}`}
                            className="relative border-r-8 border-border"
                            onMouseEnter={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={img}
                              style={{ objectFit: "cover" }}
                              alt="Property Image"
                              fill={true}
                              sizes="100%"
                              priority={true}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="flex h-full min-w-[40%] flex-1 flex-col gap-4 p-4">
                    <h3 className="text-2xl font-bold">{property.title}</h3>
                    <h5>{property.location}</h5>
                    <div className="flex items-center justify-start gap-4 text-xl font-thin">
                      <h4>{property.price} ₺</h4>
                      <Badge className="text-lg font-bold">
                        {property.roomCount}
                      </Badge>
                      <Badge className="text-lg font-bold">
                        {property.isForRent ? "Kiralık" : "Satılık"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-4">
                      {property.tags.slice(0, 4).map((tag, tagIndex) => (
                        <Badge
                          className="font-mono text-lg"
                          variant="outline"
                          key={`propertyTag-${property._id}-${tagIndex}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-1" />
                    <Link href={`/property/${property._id}`}>
                      <Button>Detaylar</Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
