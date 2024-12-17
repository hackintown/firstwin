import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Banner() {
  const banners = [
    {
      id: 1,
      image:
        "https://ossimg.dmwinimage.com/DmWin/banner/Banner_20241028195902fwc4.png",
    },
    {
      id: 2,
      image:
        "https://ossimg.dmwinimage.com/DmWin/banner/Banner_202410282009436n8c.png",
    },
    {
      id: 3,
      image:
        "https://ossimg.dmwinimage.com/DmWin/banner/Banner_202410281959247468.png",
    },
    {
      id: 4,
      image:
        "https://ossimg.dmwinimage.com/DmWin/banner/Banner_202410282011415eqk.png",
    },
  ];

  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet`,
          bulletActiveClass: `swiper-pagination-bullet-active`,
        }}
        className="rounded-xl shadow-lg"
        keyboard={{ enabled: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            height: 240,
          },
          768: {
            slidesPerView: 1,
            height: 320,
          },
          1024: {
            slidesPerView: 1,
            height: 400,
          },
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[232px]">
              <img
                src={banner.image}
                alt={`Banner ${banner.id}`}
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
