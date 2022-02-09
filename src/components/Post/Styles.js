import styled from '@emotion/styled/macro';
export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--fds-white);
  border: 1px solid var(--fds-gray-4);
  border-radius: var(--borderRadius2);
`;

export const Header = styled.div`
  padding: 1.6rem 1.6rem 0 1.6rem;
`;

export const Body = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  .live-stats {
    padding-top: unset;
  }
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: var(--fds-gray-7);
  line-height: 1.5;
`;
