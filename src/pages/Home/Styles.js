import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.8rem;

  &::-webkit-scrollbar {
    width: 0;
  }

  .scroll-loader {
    margin: 0 auto;
    color: var(--mainColor);
  }
`;
