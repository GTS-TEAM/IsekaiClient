import styled from '@emotion/styled';

export const StyledHomepage = styled.div`
  background-color: #f0f2f5;
  min-height: calc(100vh - var(--headerHeight));
  padding: 1.8rem;

  .homepage-container {
    display: flex;
    column-gap: 1.8rem;
  }

  .w-25 {
    width: 25%;
    height: 100%;
  }
`;

export const Feed = styled.div`
  width: 100%;
  flex: 1;
`;
