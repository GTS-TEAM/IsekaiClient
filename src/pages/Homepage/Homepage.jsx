import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components';
import { getTimeline, postsSelector } from '../../features/postsSlice';
import { CreatePost } from './components';
import styled from './Homepage.module.scss';

const Homepage = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector(postsSelector);
  useEffect(() => {
    dispatch(getTimeline());
  }, [dispatch]);

  return (
    <div className={styled.homepage}>
      <div className={styled.feed}>
        <CreatePost />
        <ul className={styled.post_list}>
          {timeline.posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;
