import styled from '@emotion/styled/macro';

export const StyledSidebar = styled.aside`
  width: 100%;
  background-color: var(--fds-white);
  border-right: 1px solid var(--fds-gray-4);
  height: calc(100vh - var(--headerHeight));
`;

export const SidebarHeader = styled.div`
  height: var(--headerHeight);
  overflow: hidden;
  border-bottom: 1px solid var(--fds-gray-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--fds-gray-9);
  }
`;

export const ButtonNewConversation = styled.button`
  width: 4.2rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1.8px dashed #999;
  background-color: transparent;
  cursor: pointer;
  transition: all 1s ease;

  &:hover {
    border-style: solid;
    border-color: var(--mainColor);

    svg {
      color: var(--mainColor);
    }
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: #999;
  }
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  overflow-y: auto;
  height: calc(100vh - 2 * var(--headerHeight));
`;

export const SidebarItem = styled.div`
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  .MuiAvatar-root {
    width: 5.6rem;
    height: 5.6rem;
  }

  & > .MuiBox-root {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    flex: 1;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--fds-gray-7);
    line-height: 1.4;
  }
`;
