import styled from '@emotion/styled';

export const StyledSidebar = styled.div`
  min-height: calc(100vh - var(--headerHeight));
  position: fixed;
  bottom: 0;
  left: 0;
  top: var(--headerHeight);
  width: 27rem;
  padding: 1.8rem 0.8rem;
  background-color: var(--fds-white);
  font-size: 1.4rem;
  color: var(--fds-gray-9);

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 0.8rem;

    li {
      width: 100%;
    }

    a {
      padding: 0.8rem 1.6rem;
      display: flex;
      align-items: center;
      gap: 1.6rem;
      width: 100%;
      color: inherit;
      transition: all 0.3s;
      border-radius: 4px;
      font-family: inherit;
      font-weight: 500;

      &:hover,
      &.is-active {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }

    a svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;
