import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { StyledSlideImgPost } from './Styles';
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';

const SlideImgPost = ({ images }) => {
  const btnNextRef = useRef();
  const btnPrevRef = useRef();

  useEffect(() => {
    const swiperPagination = document.querySelector('.swiper-pagination');
    if (images.length === 1) {
      swiperPagination.classList.add('disable');
    } else {
      swiperPagination.classList.remove('disable');
    }
  }, [images]);

  return (
    <StyledSlideImgPost>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: btnPrevRef.current ? btnPrevRef.current : undefined,
          nextEl: btnNextRef.current ? btnNextRef.current : undefined,
        }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = btnPrevRef.current;
          swiper.params.navigation.nextEl = btnNextRef.current;
        }}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={uuidv4()}>
              <div className="bg-blur" style={{ backgroundImage: `url(${img})` }}></div>
              <img src={img} alt="" />
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

export default SlideImgPost;
