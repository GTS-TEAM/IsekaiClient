import styled from '@emotion/styled';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.8rem;

  h3 {
    font-size: 2.125rem;
    font-weight: 500;
    color: var(--fds-black-1);
  }

  a button {
    text-transform: unset;
    font-size: 1.4rem;
    color: var(--mainColor);
  }
`;
