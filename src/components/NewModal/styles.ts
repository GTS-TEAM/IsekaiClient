import styled from '@emotion/styled/macro';
import { fadeIn, zoomInModal } from 'utils/keyframeStyle';

export const StyledModalWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease;
  padding: 0 1.5rem;
`;

export const Modal = styled.div`
  width: 100%;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
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
    width: 3rem;
    height: 3rem;

    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: var(--fds-gray-10);
    }
  }
`;
