import React, { useRef, forwardRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { StyledSlideImgPost } from './Styles';
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';
import Img from './Img';

const SlideImgPost = ({ images, slideIndex }) => {
  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const swiperRef = useRef();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideIndex, 0);
    }
  }, [slideIndex]);

  return (
    <StyledSlideImgPost>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: btnPrevRef.current ? btnPrevRef.current : undefined,
          nextEl: btnNextRef.current ? btnNextRef.current : undefined,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = btnPrevRef.current;
          swiper.params.navigation.nextEl = btnNextRef.current;
        }}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={uuidv4()}>
              <Img imgUrl={img} />
            </SwiperSlide>
          );
        })}
        <div ref={btnPrevRef} className="btn-move prev">
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div ref={btnNextRef} className="btn-move next">
          <MdOutlineKeyboardArrowRight />
        </div>
      </Swiper>
    </StyledSlideImgPost>
  );
};

export default React.memo(SlideImgPost);
