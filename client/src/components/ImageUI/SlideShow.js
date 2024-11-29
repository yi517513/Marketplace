import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ImageWithActions } from "./ImageContainer";

export const SlideShow = ({ images, className }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView="auto"
      autoplay={{ delay: 5000 }}
      loop
      className="w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide
          key={image._id || index}
          className="flex justify-center items-center"
        >
          <ImageWithActions image={image} hasPreview={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
