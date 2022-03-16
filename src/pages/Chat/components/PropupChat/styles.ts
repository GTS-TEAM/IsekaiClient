import styled from '@emotion/styled/macro';

export const PopupWrap = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  bottom: 0;
  right: 8rem;
  column-gap: 1.2rem;
`;

export const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2) var(--borderRadius2) 0 0;
  border: 1px solid var(--fds-gray-4);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 35rem;
  height: 50rem;
`;
