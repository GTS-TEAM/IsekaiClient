import { Button, Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import CreatePost from 'components/CreatePost/CreatePost';
import ListPost from 'components/ListPost/ListPost';
import { authSelector } from 'features/authSlice';
import { getUserPosts, postsSelector, unmountTimeline } from 'features/postsSlice';
import { addToast } from 'features/toastSlice';
import { getUser, unMountUser, userSelector } from 'features/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IStatus } from 'share/types';
import { v4 } from 'uuid';
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
  const [status, setStatus] = useState<IStatus | null>(null);

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
      Promise.all([isekaiApi.getStatusFriend(id), isekaiApi.getListFriend(id)])
        .then((res) => {
          console.log(res);
          const [statusRes, friendRes] = res;
          setStatus(statusRes.data.request);
          console.log(friendRes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, dispatch]);

  return (
    <StyledProfile className="layout">
      <div>
        <CoverImg imgBgUrl={user?.background || ''} userId={user?.id || ''} />
        <ProfileMenu />
        <User>
          <h2>{user?.username}</h2>
          <p>3.2k Bạn bè</p>
          {(() => {
            if (id === currentUser?.id) {
              return null;
            }
            switch (status?.status) {
              case 'none':
                return (
                  <Button
                    className="button-friend"
                    onClick={async () => {
                      try {
                        if (id) {
                          await isekaiApi.addFriend(id);
                        }
                        dispatch(
                          addToast({
                            content: 'Thêm bạn bè thành công',
                            id: v4(),
                            type: 'success',
                          }),
                        );
                        setStatus({
                          creator_id: currentUser?.id as string,
                          status: 'pending',
                        });
                      } catch (error) {
                        dispatch(
                          addToast({
                            content: 'Thêm bạn bè thất bại',
                            id: v4(),
                            type: 'error',
                          }),
                        );
                      }
                    }}
                  >
                    Kết bạn
                  </Button>
                );
              case 'accepted':
                return <Button className="button-friend">Huỷ kết bạn</Button>;
              case 'pending':
                if (status.creator_id === currentUser?.id) {
                  return (
                    <Button
                      className="button-friend"
                      onClick={async () => {
                        try {
                          if (id) {
                            await isekaiApi.responseFriendRequest(id, 'none');
                            dispatch(
                              addToast({
                                content: 'Hủy kết bạn thành công',
                                id: v4(),
                                type: 'success',
                              }),
                            );
                            setStatus({
                              creator_id: null,
                              status: 'none',
                            });
                          }
                        } catch (error) {}
                      }}
                    >
                      Hủy lời mời kết bạn
                    </Button>
                  );
                }

                return (
                  <Button
                    className="button-friend"
                    onClick={async () => {
                      try {
                        if (id) {
                          await isekaiApi.responseFriendRequest(id, 'accepted');
                          dispatch(
                            addToast({
                              content: 'Đã chấp nhật kết bạn',
                              id: v4(),
                              type: 'success',
                            }),
                          );
                          setStatus({
                            creator_id: currentUser?.id as string,
                            status: 'accepted',
                          });
                        }
                      } catch (error) {}
                    }}
                  >
                    Chấp nhận kết bạn
                  </Button>
                );

              default:
                return null;
            }
          })()}
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
  );
};

export default Profile;
