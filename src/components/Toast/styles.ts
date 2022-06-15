import styled from '@emotion/styled/macro';

export const StyledToast = styled.div`
  position: fixed;
  bottom: 1.6rem;
  left: 1.6rem;
  z-index: 10000;

  ul {
    display: flex;
    flex-direction: column;
  }

  li:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;
