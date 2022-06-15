import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { addToast } from 'features/toastSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import { StyledBadge } from 'pages/Chat/components/Header/styles';
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { IFriend } from 'share/types';
import { v4 } from 'uuid';
import { StyledFriend, StyledListFriend } from './styles';

const ListFriend = () => {
  const [friends, setFriends] = useState<IFriend[]>([]);
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getListFriend = async () => {
      if (user) {
        const { data } = await isekaiApi.getSuggestFriend();
        setFriends(data);
      }
    };
    getListFriend();
  }, [user]);

  return (
    <StyledListFriend>
      <div className="title">Người liên hệ</div>
      <ul>
        {friends.map((friend) => (
          <React.Fragment key={friend.id}>
            <li>
              <StyledFriend>
                {!friend.last_activity ? (
                  <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                    <Avatar src={friend.avatar} alt={friend.username} />
                  </StyledBadge>
                ) : (
                  <Avatar src={friend.avatar} alt={friend.username} />
                )}
                <div className="infoFr">
                  <span>{friend.username}</span>
                  <div className="online">
                    {!friend.last_activity ? (
                      <span className="timeFr">Đang hoạt động</span>
                    ) : (
                      <span className="timeFr">{moment(friend.last_activity, moment.defaultFormat).fromNow()}</span>
                    )}
                  </div>
                </div>
                <div
                  className="add-friend"
                  onClick={async () => {
                    if (friend.status === 'none') {
                      try {
                        await isekaiApi.addFriend(friend.id);
                        setFriends(
                          [...friends].map((_f) => {
                            if (_f.id === friend.id) {
                              return {
                                ..._f,
                                status: 'pending',
                              };
                            }
                            return _f;
                          }),
                        );
                        dispatch(
                          addToast({
                            content: 'Thêm bạn bè thành công',
                            type: 'success',
                            id: v4(),
                          }),
                        );
                      } catch (error) {
                        console.log(error);
                        dispatch(
                          addToast({
                            content: 'Thêm bạn bè thất bại',
                            type: 'error',
                            id: v4(),
                          }),
                        );
                      }
                    }

                    if (friend.status === 'pending') {
                      try {
                        await isekaiApi.responseFriendRequest(friend.id, 'none');
                        setFriends(
                          [...friends].map((_f) => {
                            if (_f.id === friend.id) {
                              return {
                                ..._f,
                                status: 'none',
                              };
                            }
                            return _f;
                          }),
                        );
                        dispatch(
                          addToast({
                            content: 'Hủy gởi lời kết bạn thành công',
                            type: 'success',
                            id: v4(),
                          }),
                        );
                      } catch (error) {
                        console.log(error);
                        dispatch(
                          addToast({
                            content: 'Hủy gởi lời kết bạn thất bại',
                            type: 'error',
                            id: v4(),
                          }),
                        );
                      }
                    }
                  }}
                >
                  {friend.status === 'pending' ? (
                    <AiOutlineUserDelete
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      title="Huỷ lời mời kết bạn"
                    />
                  ) : null}
                  {friend.status === 'none' && (
                    <AiOutlineUserAdd
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      title="Thêm bạn bè"
                    />
                  )}
                </div>
              </StyledFriend>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </StyledListFriend>
  );
};

export default React.memo(ListFriend);
