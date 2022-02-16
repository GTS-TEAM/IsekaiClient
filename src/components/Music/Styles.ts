import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const infiniteText = keyframes`
 
  100%{
    transform:translateX(-100%)
  }
`;

export const StyledMusic = styled.div`
  padding: 1.6rem;
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  overflow: hidden;
  background-color: var(--fds-white);
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;

export const InputSearch = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  background: var(--fds-gray-6);
  border-radius: var(--borderRadius3);
  column-gap: 1rem;
  border: 1px solid;
  border-color: var(--fds-gray-6);
  transition: all 0.3s;
  font-size: 1.4rem;
  padding-left: 1.6rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--fds-gray-11);
  }

  input {
    flex: 1;
    background-color: transparent;
    width: 100%;
    color: var(--fds-gray-8);

    &::placeholder {
      color: var(--fds-gray-11);
      font-weight: 400;
    }
  }

  .MuiButton-root {
    height: 4rem;
    padding: 0 1.6rem;
    margin: 0 auto;
    font-size: 1.6rem;
    text-transform: unset;
    color: var(--fds-white);
    background-color: var(--mainColor);
    border-radius: var(--borderRadius);
    border-radius: 0 var(--borderRadius3) var(--borderRadius3) 0;

    &:hover {
      background-color: var(--mainColor);
    }
    svg {
      color: var(--fds-white);
    }
  }
`;

export const ListSong = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  max-height: 20.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

interface PropsSong {
  active: boolean;
}

export const Song = styled.div<PropsSong>`
  background-color: var(--fds-gray-6);
  padding: 1.2rem;
  border-radius: var(--borderRadius1);
  cursor: pointer;

  ${(p) =>
    p.active
      ? css`
          background-color: var(--mainColor);

          .song-name,
          .song-author {
            color: var(--fds-white) !important;
          }
        `
      : css``}

  .song-name {
    color: var(--fds-gray-9);
    font-size: 1.4rem;
    font-weight: 500;
    white-space: nowrap;
    max-width: 20rem;
    overflow: hidden;

    h3 {
      white-space: nowrap;
      animation: ${infiniteText} 10s linear infinite;
      padding-left: 100%;
      text-align: center;
      display: inline-block;
    }
  }

  .song-author {
    font-size: 1.2rem;
    color: var(--fds-gray-5);
  }
`;

export const StyledControl = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(40px);
  padding: 1.2rem;
  border-radius: var(--borderRadius1);

  .song-name {
    color: var(--fds-white);
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.3;
  }
  .uploader,
  .song-author {
    font-size: 1.2rem;
    color: var(--fds-white);
  }

  .MuiSlider-root {
    color: var(--fds-white);
  }
  .MuiSlider-thumb {
    width: 12px;
    height: 12px;

    &:hover,
    &.Mui-focusVisible {
      box-shadow: 0px 0px 0px 8px rgb(255 255 255 / 16%);
    }

    &.Mui-active {
      width: 20px;
      height: 20px;
    }
  }

  .MuiSlider-thumb::before {
    box-shadow: rgb(0 0 0 / 40%) 0px 2px 12px 0px;
  }
`;

export const DurationWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left,
  .right {
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--fds-white);
  }
`;

export const VolumeWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2.4rem;

  svg {
    width: 3.6rem;
    height: 3.6rem;
    color: var(--fds-white);
  }
`;

export const ButtonUpload = styled(Button)`
  background-color: var(--mainColor);
  height: 4rem;
  color: var(--fds-white);
  font-size: 1.4rem;
  text-transform: capitalize;
  border-radius: var(--borderRadius1);

  &:hover {
    background-color: var(--mainColor);
  }
`;
