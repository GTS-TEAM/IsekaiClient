import styled from '@emotion/styled';

export const StyledSlideImgPost = styled.div`
  .swiper {
    height: 50rem;
    position: relative;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-pagination {
    position: absolute;
    width: 100%;
    bottom: 1.6rem;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;

    .swiper-pagination-bullet {
      width: 1rem;
      height: 1rem;
      background-color: var(--textColorWhite);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      border-radius: 50%;
      border: 1px solid var(--borderColor);
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background-color: var(--mainColor);
    }

    &.disable {
      display: none;
    }
  }

  .swiper-slide .bg-blur {
    background-position: center;
    background-size: 150%;
    background-repeat: no-repeat;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
  }

  .swiper-slide img {
    object-fit: contain;
    position: relative;
    z-index: 2;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    width: 100%;
    height: 100%;
  }

  .btn-move {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background-color: var(--textColorWhite);
    border: 1px solid var(--borderColor);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 50%;
    cursor: pointer;

    &.next {
      right: 1rem;
    }

    &.prev {
      left: 1rem;
    }

    &.swiper-button-disabled {
      display: none;
    }

    svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--textColorBlack);
    }
  }
`;
