import styled from '@emotion/styled';
import { fadeIn } from './../../utils/keyframeStyle';

export const StyledEmotion = styled.div`
  background-color: var(--grayColor1);
  padding: 1.6rem;
  padding-top: 6.2rem;
  border-radius: var(--borderRadius3);
  border: 1px solid var(--borderColor);
  position: relative;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  height: 3rem;
  width: 3rem;
  background-color: var(--textColorGray);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--textColorWhite);
  }
`;

export const Emotions = styled.div`
  --col: 2;
  --gap: 2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap);
  margin-right: calc(-1 * var(--gap));

  .emotion {
    width: calc(100% / var(--col) - var(--gap));
    display: flex;
    align-items: center;
    cursor: pointer;
    column-gap: 1rem;
    padding: 1rem 1.5rem;
    border-radius: var(--borderRadius);
    transition: all 0.3s;

    &.active {
      background-color: var(--mainColor);

      span {
        color: var(--textColorWhite);
      }

      .emoji {
        background-color: transparent;
      }
    }

    .emoji {
      background-color: var(--grayColor);
      border-radius: 50%;
      transition: all 0.3s;

      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }

    span {
      font-size: 1.6rem;
      color: var(--textColorGray);
    }
  }
`;

export const StyledStatus = styled.div`
  position: relative;
  .input-wrap {
    width: 100%;
    position: relative;
    input {
      height: 3.6rem;
      padding: 0.6rem 3.6rem;
      color: var(--fds-gray-1);
      font-size: 1.4rem;
      border: 1px solid var(--fds-gray-4);
      width: inherit;
      border-radius: var(--borderRadius2);
    }

    .icon {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
    }

    .icon svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--fds-gray-11);
    }

    .icon.close {
      right: 0;
      left: unset;
    }
  }
`;

export const StyledListSearch = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  background-color: var(--fds-white);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);
  border-radius: var(--borderRadius);
  margin-top: 1.2rem;
  max-height: 20rem;
  overflow-y: auto;
  border-radius: var(--borderRadius2);

  &::-webkit-scrollbar {
    width: 0;
  }

  ul {
    color: var(--fds-gray-10);
  }

  li {
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    width: 100%;
    animation: ${fadeIn} 0.3s ease;
    transition: all 0.3s ease;

    img {
      width: 3rem;
      height: 3rem;
    }

    span {
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    &.selected {
      background-color: #ebebeb;
    }
  }

  p {
    font-size: 1.4rem;
    text-align: center;
    padding: 1.2rem;
  }
`;
