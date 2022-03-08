import styled from '@emotion/styled/macro';
import { IconButton } from '@mui/material';
import { fadeIn } from 'utils/keyframeStyle';

export const Video = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

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
      color: var(--fds-white);
      .MuiSlider-thumb {
        color: var(--fds-white);
      }
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
        /* opacity: 0; */
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

export const StyledImg = styled.img`
  max-height: calc(100vh - 20rem);
`;

export const StyledButton = styled(IconButton)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  left: 2rem;
  top: 2rem;
  background-color: var(--fds-white);

  a {
    color: var(--fds-gray-8);
  }

  &:hover {
    background-color: var(--fds-white);
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--fds-gray-8);
  }
`;
