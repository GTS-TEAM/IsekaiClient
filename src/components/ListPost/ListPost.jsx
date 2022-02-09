import React from 'react';
import PropTypes from 'prop-types';
import { StyledInfiniteScroll } from './Styles';
import { CircularProgress } from '@mui/material';
import { Post } from 'components';
const ListPost = ({ posts, hasMore, onFetchMore }) => {
  return (
    <StyledInfiniteScroll
      style={{ overflowY: 'hidden' }}
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

ListPost.propTypes = {
  posts: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onFetchMore: PropTypes.func.isRequired,
};

export default ListPost;
