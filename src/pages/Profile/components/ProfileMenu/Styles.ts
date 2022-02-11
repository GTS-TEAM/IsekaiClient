import styled from '@emotion/styled/macro';

export const StyledProfileMenu = styled.div`
  padding: 1rem 0;

  @media screen and (max-width: 1023.98px) {
    display: none;
  }

  .stack {
    width: 100%;
  }

  .MuiButton-root {
    background-color: var(--fds-gray);
    border-radius: var(--borderRadius2);
    height: 4rem;
    width: 100%;
    max-width: 13rem;
    flex-shrink: 0;
    padding: 0;
    font-size: 1.6rem;
    color: var(--fds-gray-1);
    text-transform: unset;
    border: 1px solid var(--fds-gray-2);
  }
`;
