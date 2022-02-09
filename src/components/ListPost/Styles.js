import styled from '@emotion/styled/macro';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  overflow: unset !important;

  &::-webkit-scrollbar {
    width: 0;
  }

  .scroll-loader {
    margin: 0 auto;
    color: var(--mainColor);
  }
`;
