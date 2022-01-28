import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
