import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { MessageType } from 'share/types';
import { fadeIn } from 'utils/keyframeStyle';

export const StyledMessage = styled.div<{
  timeCreated: number | string | null;
  maxWidtH?: string;
  type: string;
  themeStyle: string | null;
}>`
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: var(--borderRadius3);
  padding: 1rem 1.2rem;
  background-color: ${(p) => (p.themeStyle ? p.themeStyle : 'var(--mainColor)')};
  color: var(--fds-white);
  position: relative;
  max-width: ${(p) => (p.maxWidtH ? p.maxWidtH : '60rem')};
  line-height: 1.5;
  word-break: break-all;

  /* &::before {
    content: '';
    background-color: inherit;
    position: absolute;
    clip-path: polygon(0 0, 0 100%, 100% 50%);
    width: 1rem;
    height: 1rem;
    top: 50%;
  } */

  &::after {
    content: '${(p) => p.timeCreated}';
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
  ${(p) =>
    p.type === MessageType.SYSTEM
      ? css`
          background-color: unset;
          color: var(--fds-gray-3);
          margin-left: 0 !important;
          padding: unset;
          &::after {
            display: none;
          }
          &::before {
            display: none;
          }
        `
      : undefined}
`;

interface MessageStyledProps {
  left?: boolean;
  type?: string;
}
export const MessageWrapStyled = styled.div<MessageStyledProps>`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  position: relative;

  .features {
    opacity: 0;
    visibility: hidden;
  }

  &:hover .features {
    opacity: 1;
    visibility: visible;
  }

  .MuiAvatar-root {
    align-self: flex-end;
    width: 2.8rem;
    height: 2.8rem;
  }

  ${(p) =>
    p.left
      ? css`
          flex-direction: row;
          justify-content: flex-end;
        `
      : css`
          flex-direction: row-reverse;
          justify-content: flex-end;
        `}

  ${(p) =>
    !p.left
      ? css`
          ${StyledMessage} {
            &::before {
              transform: translateY(-50%) rotate(-180deg);
              right: calc(100% - 0.5px);
            }
            &::after {
              left: calc(100% + 1.2rem);
              z-index: 2;
            }
          }
        `
      : css`
          ${StyledMessage} {
            &::before {
              transform: translateY(-50%) rotate(0);
              left: calc(100% - 0.5px);
            }
            &::after {
              right: calc(100% + 1.2rem);
              z-index: 2;
            }
          }
        `}

        ${(p) =>
    p.type === MessageType.SYSTEM
      ? css`
          justify-content: center;
          .features,
          .MuiAvatar-root {
            display: none;
          }
        `
      : undefined}
      
  ${(p) =>
    p.type === MessageType.GIF || p.type === MessageType.IMAGE
      ? css`
          img.img-file {
            border-radius: var(--borderRadius3);
            max-width: 30rem;
          }
        `
      : undefined}
`;

export const File = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  padding: 1.2rem;
  background-color: var(--mainColor);
  border-radius: var(--borderRadius3);

  & > svg {
    width: 3.6rem;
    height: 3.6rem;
    color: var(--fds-white);
  }

  span {
    width: 15rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 1.4rem;
    color: var(--fds-white);
  }

  a svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--fds-white);
  }
`;

export const Audio = styled.div<{
  themeStyle: string;
}>`
  border-radius: var(--borderRadius3);
  width: 22rem;
  height: 3.6rem;
  background-color: ${(p) => p.themeStyle || 'var(--mainColor)'};
  display: flex;
  align-items: center;
  padding: 0 0.65rem;
  column-gap: 1.2rem;

  audio {
    display: none;
  }

  .MuiSlider-root {
    color: var(--fds-white);

    .MuiSlider-thumb {
      color: inherit;
    }

    .MuiSlider-thumb.Mui-active,
    .MuiSlider-thumb.Mui-focusVisible,
    .MuiSlider-thumb:hover {
      box-shadow: unset;
    }
  }

  .duration {
    margin-left: auto;
    height: 2.3rem;
    width: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
    background-color: var(--fds-white);
    border-radius: inherit;
    color: ${(p) => p.themeStyle || 'var(--mainColor)'};
    flex-shrink: 0;
  }

  .control {
    width: 2.3rem;
    height: 2.3rem;
    background-color: var(--fds-white);
    border-radius: 50%;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;

    & > div {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 1.4rem;
      height: 1.4rem;
      color: ${(p) => p.themeStyle || 'var(--mainColor)'};
    }
  }
`;

export const Video = styled.div`
  border-radius: var(--borderRadius3);
  overflow: hidden;
  max-width: 30rem;
  height: 35rem;
  background-color: var(--fds-white);
  position: relative;

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: var(--fds-white);
    width: 5rem;
    height: 5rem;
    cursor: pointer;
  }

  .control {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    padding: 1.2rem;
    color: var(--fds-white);
    display: none;
    animation: ${fadeIn} 0.5s ease;

    svg {
      color: inherit;
      width: 1.6rem;
      height: 1.6rem;
      flex-shrink: 0;
      cursor: pointer;

      &.volume-svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }

    .MuiSlider-root {
      color: inherit;
      .MuiSlider-thumb.Mui-active,
      .MuiSlider-thumb.Mui-focusVisible,
      .MuiSlider-thumb:hover {
        box-shadow: unset;
      }
    }

    .volume {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1.2rem;
      position: relative;

      .MuiSlider-root {
        position: absolute;
        bottom: calc(100% + 1.2rem);
        height: 5rem;
        width: 0.5em;
      }

      .MuiSlider-rail {
        opacity: 0;
      }
    }
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    .control {
      display: flex;
    }
  }
`;
