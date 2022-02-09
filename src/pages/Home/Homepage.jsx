import { getTimeline, postsSelector, unmountTimeline } from 'features/postsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreatePost, ListPost } from 'components';
import { Feed, StyledHomepage } from './Styles';

const Homepage = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector(postsSelector);
  const [page, setPage] = useState(1);

  const fetchMoreHandler = () => {
    dispatch(getTimeline({ page: page + 1 }));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(unmountTimeline());
    dispatch(getTimeline({ page: 1 }));
  }, [dispatch]);

  return (
    <StyledHomepage>
      <Feed>
        <CreatePost />
        <ListPost posts={timeline.posts} hasMore={timeline.hasMore} onFetchMore={fetchMoreHandler} />
      </Feed>
    </StyledHomepage>
  );
};

export default Homepage;
