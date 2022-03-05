import React, { useEffect } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import Img from './Img';
import { StyledSlideImgPost } from './Styles';

interface Props {
  images: string[];
  slideIndex: number;
}
SwiperCore.use([Navigation]);

const SlideImgPost: React.FC<Props> = ({ images, slideIndex }) => {
  const swiperRef = React.useRef<SwiperCore>();

  const nextSlideHandler = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlideHandler = () => {
    swiperRef.current?.slidePrev();
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex, 0);
    }
  }, [slideIndex]);

  return (
    <StyledSlideImgPost>
      <Swiper
        allowTouchMove={true}
        modules={[Navigation]}
        onInit={(swiper: SwiperCore) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={uuidv4()}>
            <Img imgUrl={img} />
          </SwiperSlide>
        ))}
        <div className="btn-move btn-prev" onClick={prevSlideHandler}>
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div className="btn-move btn-next" onClick={nextSlideHandler}>
          <MdOutlineKeyboardArrowRight />
        </div>
      </Swiper>
    </StyledSlideImgPost>
  );
};

export default React.memo(SlideImgPost);
