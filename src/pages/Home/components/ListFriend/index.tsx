import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { addToast } from 'features/toastSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IFriend } from 'share/types';
import { v4 } from 'uuid';
import { Card, CardBody, CardHeading } from './styles';

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
    <Card>
      <CardHeading>
        <h4>Suggested friends</h4>
      </CardHeading>
      <CardBody>
        {friends.map((friend, index) => (
          <div className="add-friend-block" key={friend.id}>
            <Avatar src={friend.avatar} alt={friend.username} />
            <div className="page-meta">
              <Link to={`/profile/${friend.id}`}>
                <span>{friend.username}</span>
              </Link>
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
                            status: 'accepted',
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
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default React.memo(ListFriend);
