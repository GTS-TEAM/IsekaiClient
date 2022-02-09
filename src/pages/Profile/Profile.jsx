import { Stack } from '@mui/material';
import { CreatePost, Layout, ListPost } from 'components';
import { authSelector } from 'features/authSlice';
import { getUserPosts, postsSelector, unmountTimeline } from 'features/postsSlice';
import { getUser, unMountUser, userSelector } from 'features/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CoverImg from './components/CoverImg/CoverImg';
import Info from './components/Info/Info';
import PhotosPreview from './components/Photos/PhotosPreview';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import { Sidebar, StyledProfile, User } from './Styles';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { timeline } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);
  const { user: currentUser } = useSelector(authSelector);
  const [page, setPage] = useState(1);

  const fetchMoreHandler = () => {
    dispatch(getUserPosts({ userId: id, page: page + 1 }));
    setPage(page + 1);
  };

  useEffect(() => {
    return () => {
      dispatch(unMountUser());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(unmountTimeline());
    dispatch(getUserPosts({ userId: id, page: 1 }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <StyledProfile>
        <div>
          <CoverImg imgBgUrl={user?.background} userImg={user?.avatar} userId={user?.id} />
          <ProfileMenu />
          <User>
            <h2>{user?.username}</h2>
            <p>3.2k Bạn bè</p>
          </User>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Stack direction="row" columnGap="1.2rem">
            <Sidebar>
              <Info bio={user?.bio} userId={user?.id} />
              <PhotosPreview userId={id} />
            </Sidebar>
            <main style={{ flex: '1' }}>
              {currentUser.id === user?.id && <CreatePost />}
              <ListPost
                posts={timeline.posts}
                hasMore={timeline.hasMore}
                onFetchMore={fetchMoreHandler}
                style={currentUser.id === user?.id ? { marginTop: '1.2rem' } : { marginTop: 'unset' }}
              />
            </main>
          </Stack>
        </div>
      </StyledProfile>
    </Layout>
  );
};

export default Profile;
