import { CircularProgress } from '@mui/material';
import Post from 'components/Post/Post';
import React from 'react';
import { PostItem } from 'share/types';
import { StyledInfiniteScroll } from './Styles';

interface Props {
  posts: PostItem[];
  hasMore: boolean;
  onFetchMore: () => any;
  style?: React.CSSProperties;
}

const ListPost: React.FC<Props> = ({ posts, hasMore, onFetchMore, style }) => {
  return (
    <StyledInfiniteScroll
      style={style}
      dataLength={posts.length}
      hasMore={hasMore}
      next={onFetchMore}
      loader={<CircularProgress className="scroll-loader" color="inherit" />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </StyledInfiniteScroll>
  );
};

export default ListPost;
