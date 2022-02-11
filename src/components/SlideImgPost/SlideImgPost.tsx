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
  const prevButton = React.useRef<HTMLDivElement>(null);
  const nextButton = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex, 0);
    }
  });

  return (
    <StyledSlideImgPost>
      <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper: SwiperCore) => {
          swiperRef.current = swiper;
          if (typeof swiper.params.navigation !== 'boolean') {
            const navigation = swiper.params.navigation;
            if (navigation) {
              navigation.prevEl = prevButton.current;
              navigation.nextEl = nextButton.current;
            }
          }
        }}
      >
        {images.map((img) => {
          return (
            <SwiperSlide key={uuidv4()}>
              <Img imgUrl={img} />
            </SwiperSlide>
          );
        })}
        <div ref={prevButton} className="btn-move btn-prev">
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div ref={nextButton} className="btn-move btn-next">
          <MdOutlineKeyboardArrowRight />
        </div>
      </Swiper>
    </StyledSlideImgPost>
  );
};

export default React.memo(SlideImgPost);
