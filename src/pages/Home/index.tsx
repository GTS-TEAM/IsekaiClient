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
import { getListMusic } from '../../features/musicSlice';
import Birthday from './components/Birthday';
import FakeComponent from './components/FakeComponent';
import ListFriend from './components/ListFriend';
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
    const fetchData = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          dispatch(getListMusic({ page: 1, limit: 10, type: 'noMore' }));
        }, 1000);
        resolve();
      });
    };
    fetchData();
  }, [dispatch]);

  return (
    <StyledHomepage className="layout">
      <Container className="homepage-container">
        <Stack
          className="w-25"
          sx={{
            rowGap: '1.2rem',
          }}
        >
          <Music />
          <Weather />
          <FakeComponent />
        </Stack>
        <Feed>
          <CreatePost />
          <ListPost posts={timeline.posts} hasMore={timeline.hasMore} onFetchMore={fetchMoreHandler} />
        </Feed>
        <div className="w-25">
          <ListFriend />
          <Birthday />
        </div>
      </Container>
    </StyledHomepage>
  );
};

export default Homepage;
