import styled from '@emotion/styled';

export const StyledProfile = styled.div`
  padding: 1.8rem;
`;

export const User = styled.div`
  text-align: center;
  padding: 1.6rem 0;
  color: var(--fds-black);
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  h2 {
    font-size: 2.2rem;
  }

  p {
    font-size: 1.3rem;
    color: var(--fds-gray-1);
  }

  @media screen and (max-width: 1023.98px) {
    margin-top: 6rem;
  }
`;

export const Sidebar = styled.aside`
  width: 100%;
  max-width: 38.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;
