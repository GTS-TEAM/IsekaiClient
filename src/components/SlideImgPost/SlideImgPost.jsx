import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { StyledPagination, StyledSlideImgPost } from './Styles';
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';
import Img from './Img';

const SlideImgPost = ({ images }) => {
  const btnNextRef = useRef();
  const btnPrevRef = useRef();
  const paginationRef = useRef();

  useEffect(() => {
    if (images.length === 1) {
      paginationRef.current.style.display = 'none';
    } else {
      paginationRef.current.style.display = 'flex';
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
        pagination={{ clickable: true, el: paginationRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = btnPrevRef.current;
          swiper.params.navigation.nextEl = btnNextRef.current;
          swiper.params.pagination.el = paginationRef.current;
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
        <StyledPagination>
          <div ref={paginationRef} className="pagination"></div>
        </StyledPagination>
      </Swiper>
    </StyledSlideImgPost>
  );
};

export default React.memo(SlideImgPost);
