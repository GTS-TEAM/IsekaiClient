import styled from '@emotion/styled';
import { ColorThiefColor } from 'use-color-thief';

interface Props {
  backgroundColor: ColorThiefColor;
}

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

    &.btn-next {
      right: 1rem;
    }

    &.btn-prev {
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

export const StyledImg = styled.div<Props>`
  width: 100%;
  height: 100%;
  .bg-blur {
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-color: ${(p) => p.backgroundColor};
  }

  img {
    object-fit: contain;
    position: relative;
    z-index: 2;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    width: 100%;
    height: 100%;
  }
`;
