import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';
import Modal from 'components/Modal/Modal';

export const StyledModalPost = styled(Modal)`
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  width: 100%;
  max-width: 50rem;
`;

export const Header = styled.div`
  padding: 1.6rem;
  text-align: center;
  font-weight: 700;
  color: var(--fds-gray-9);
  font-size: 2.4rem;
  border: 1px solid var(--fds-gray-4);
`;

export const Close = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--textColorGray);
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  cursor: pointer;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--grayColor1);
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const Body = styled.div`
  max-height: 40rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;

  .MuiBox-root {
    padding: 1.6rem 1.6rem 0 1.6rem;
  }
`;

export const InputArea = styled.textarea`
  resize: none;
  font-size: 1.6rem;
  color: var(--fds-gray-8);
  font-family: inherit;
  padding: 1.6rem;
  background-color: var(--grayColor1);
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  min-height: 11rem;
  margin: 0 1.6rem;
`;

export const Bottom = styled(Stack)`
  padding: 1.6rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--fds-gray-4);
  background-color: var(--fds-white);
  flex-shrink: 0;
`;

export const TextBottom = styled.p`
  font-size: 1.6rem;
  color: var(--fds-gray-8);
  font-weight: 500;
`;

export const Actions = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 2rem;

  .add-photo,
  .add-emotion {
    border-radius: 50%;
    cursor: pointer;

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  button {
    cursor: pointer;
    font-size: 1.6rem;
    background-color: var(--mainColor);
    color: var(--textColorWhite);
    border-radius: var(--borderRadius3);
    text-transform: capitalize;
    width: 8rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      opacity: 0.7;
      pointer-events: none;
    }
    &:hover {
      background-color: var(--mainColor);
      opacity: 0.9;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba($color: #000000, $alpha: 0.7);
  z-index: 0;
`;

export const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: var(--fds-white);
`;

export const ImgPreviewList = styled(Stack)`
  --gap: 1.6rem;
  gap: var(--gap);
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: calc(-1 * var(--gap));
`;

export const ImgPreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / var(--col) - var(--gap));
  background-color: #000;

  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const InputPhoto = styled.div`
  flex-shrink: 0;
  height: 15rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: var(--borderRadius2);
  position: relative;
  background-color: var(--grayColor1);
  border: 1px solid var(--fds-gray-4);
  color: var(--fds-gray-8);
  cursor: pointer;

  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  span {
    font-size: 1.4rem;
  }
`;
