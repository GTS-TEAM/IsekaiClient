import styled from '@emotion/styled/macro';
import { fadeIn, zoomInModal } from 'utils/keyframeStyle';

export const StyledModalWrap = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease;
  padding: 0 1.5rem;
  overflow-y: auto;
`;

export const Modal = styled.div<{
  width?: string | number;
}>`
  width: 100%;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  margin: 3rem 0;

  max-width: ${(p) => {
    if (p.width) {
      if (typeof p.width === 'string') {
        return p.width;
      } else if (typeof p.width === 'number') {
        return p.width + 'px';
      }
    }
    return '55rem';
  }};

  animation: ${zoomInModal} 0.3s ease;
`;

export const Header = styled.div`
  border-bottom: 1px solid var(--fds-gray-4);
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--fds-gray-10);
  }

  .MuiButtonBase-root {
    flex-shrink: 0;
    padding: 0;
    width: 3.2rem;
    height: 3.2rem;
    min-width: unset;
    border-radius: 50%;
    color: unset;

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--fds-gray-10);
    }
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.2rem;
  gap: 1.2rem;
  border-top: 1px solid var(--fds-gray-4);

  .MuiButton-root {
    min-height: 3.8rem;
    font-size: 1.4rem;
    text-transform: unset;
    color: white;
    min-width: 8rem;

    &.cancel {
      background-color: var(--fds-gray-11);
    }

    &.ok {
      background-color: var(--mainColor);
    }
  }
`;
