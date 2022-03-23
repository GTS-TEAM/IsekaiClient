import { Stack } from '@mui/material';
import CreatePost from 'components/CreatePost/CreatePost';
import Layout from 'components/Layout/Layout';
import ListPost from 'components/ListPost/ListPost';
import { authSelector } from 'features/authSlice';
import { getUserPosts, postsSelector, unmountTimeline } from 'features/postsSlice';
import { getUser, unMountUser, userSelector } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoverImg from './components/CoverImg/CoverImg';
import Info from './components/Info/Info';
import PhotosPreview from './components/Photos/PhotosPreview';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import { Sidebar, SidebarIn, StyledProfile, User } from './Styles';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { timeline } = useAppSelector(postsSelector);
  const { user } = useAppSelector(userSelector);
  const { user: currentUser } = useAppSelector(authSelector);
  const [page, setPage] = useState<number>(1);

  const fetchMoreHandler = () => {
    if (id) {
      dispatch(getUserPosts({ userId: id, page: page + 1 }));
    }
    setPage(page + 1);
  };

  useEffect(() => {
    return () => {
      dispatch(unMountUser());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(unmountTimeline());
    if (id) {
      dispatch(getUserPosts({ userId: id, page: 1 }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id, dispatch]);

  return (
    <Layout>
      <StyledProfile className="layout">
        <div>
          <CoverImg imgBgUrl={user?.background || ''} userId={user?.id || ''} />
          <ProfileMenu />
          <User>
            <h2>{user?.username}</h2>
            <p>3.2k Bạn bè</p>
          </User>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} columnGap="1.2rem" spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Sidebar>
              <Info bio={user?.bio || ''} userId={user?.id || ''} />
              <PhotosPreview userId={id || ''} />
            </Sidebar>
            <main className="main-container">
              <SidebarIn>
                <Info bio={user?.bio || ''} userId={user?.id || ''} />
                <PhotosPreview userId={id || ''} />
              </SidebarIn>
              {currentUser?.id === user?.id && <CreatePost />}
              <ListPost
                posts={timeline.posts}
                hasMore={timeline.hasMore}
                onFetchMore={fetchMoreHandler}
                style={currentUser?.id === user?.id ? { marginTop: '1.2rem' } : { marginTop: 'unset' }}
              />
            </main>
          </Stack>
        </div>
      </StyledProfile>
    </Layout>
  );
};

export default Profile;
