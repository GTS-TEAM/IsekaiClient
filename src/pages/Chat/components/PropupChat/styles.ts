import styled from '@emotion/styled/macro';

export const PopupWrap = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  z-index: 99;
  right: 8rem;
  column-gap: 1.2rem;
  height: 50rem;
  max-width: 35rem;
`;

export const StyledPopup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2) var(--borderRadius2) 0 0;
  border: 1px solid var(--fds-gray-4);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  position: relative;
`;
