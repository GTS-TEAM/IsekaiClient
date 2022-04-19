import styled from '@emotion/styled/macro';
import { Modal } from 'components/Modal/ModalWrapper/Styles';

export const StyledModal = styled(Modal)`
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  width: 100%;
  max-width: 55rem;
`;

export const StyledBody = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Actions = styled.div`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-top: 1px solid var(--fds-gray-4);
  border-bottom: 1px solid var(--fds-gray-4);

  .MuiButton-root {
    min-height: 3.2rem;
    border-radius: 500px;
    font-size: 1.2rem;
    gap: 8px;
    background-color: var(--fds-gray-6);
    color: var(--fds-gray-3);

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const ListImgPreview = styled.ul`
  --col: 4;
  --gap: 1.2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap);

  li {
    width: calc(100% / var(--col) - var(--gap));
  }

  li .outer {
    position: relative;
    padding-bottom: 100%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  li .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
  }

  li .inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  li .MuiButtonBase-root {
    position: absolute;
    right: -1.5rem;
    top: -1.5rem;
    width: 3rem;
    height: 3rem;
    z-index: 10;
    background-color: var(--fds-gray-6);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export const StyledChooseStatus = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: 500px;
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
  gap: 8px;
  background-color: var(--fds-gray-6);
  color: var(--fds-gray-3);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
