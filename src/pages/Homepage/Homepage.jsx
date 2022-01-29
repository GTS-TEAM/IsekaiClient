import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Post } from '../../components';
import { getTimeline, postsSelector, unmountTimeline } from '../../features/postsSlice';
import { CreatePost } from './components';
import styled from './Homepage.module.scss';
import { StyledInfiniteScroll } from './Styles';

const Homepage = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector(postsSelector);
  const [page, setPage] = useState(1);
  const location = useLocation();

  console.log(location);

  const fetchMoreHandler = () => {
    dispatch(getTimeline({ page: page + 1 }));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(unmountTimeline());
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(getTimeline({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={styled.homepage}>
      <div className={styled.feed}>
        <CreatePost />
        <StyledInfiniteScroll
          style={{ overflowY: 'hidden' }}
          dataLength={timeline.posts.length}
          hasMore={timeline.hasMore}
          next={fetchMoreHandler}
          loader={<CircularProgress className="scroll-loader" color="inherit" />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {timeline.posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </StyledInfiniteScroll>
      </div>
    </div>
  );
};

export default Homepage;
