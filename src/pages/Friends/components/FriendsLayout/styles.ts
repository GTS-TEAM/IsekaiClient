import styled from '@emotion/styled';

export const StyledFriendLayout = styled.div`
  margin-top: var(--headerHeight);
  min-height: calc(100vh - var(--headerHeight));
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;

  .friends-container {
    height: 100%;
    display: flex;
    flex-grow: 1;
    margin-left: 27rem;
  }

  .friends-content {
    padding: 1.8rem;
    width: 100%;
  }
`;
