// import { CreatePost, ListPost } from 'components';
import { Stack } from '@mui/material';
import Container from 'components/Container/Container';
import CreatePost from 'components/CreatePost/CreatePost';
import ListPost from 'components/ListPost/ListPost';
import Music from 'components/Music/Music';
import Weather from 'components/Weather/Weather';
import { getTimeline, postsSelector, unmountTimeline } from 'features/postsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, StyledHomepage } from './Styles';

const Homepage = () => {
  const dispatch = useDispatch();
  const { timeline } = useSelector(postsSelector);
  const [page, setPage] = useState(1);

  const fetchMoreHandler = () => {
    dispatch(getTimeline(page + 1));
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(unmountTimeline());
    dispatch(getTimeline(1));
  }, [dispatch]);

  return (
    <StyledHomepage>
      <Container className="homepage-container">
        <Stack
          className="w-25"
          sx={{
            rowGap: '1.2rem',
          }}
        >
          <Music />
          <Weather />
        </Stack>
        <Feed>
          <CreatePost />
          <ListPost posts={timeline.posts} hasMore={timeline.hasMore} onFetchMore={fetchMoreHandler} />
        </Feed>
      </Container>
    </StyledHomepage>
  );
};

export default Homepage;