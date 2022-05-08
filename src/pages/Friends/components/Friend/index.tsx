import { Avatar, Button, Typography } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { addToast } from 'features/toastSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { IFriend } from 'share/types';
import { v4 } from 'uuid';
import { StyledItem, StyledList } from './styles';

interface PropsItem {
  friend: IFriend;
  friends: IFriend[];
  index: number;
  type: 'suggest' | 'request';
  setFriends: (friends: IFriend[]) => any;
}

interface PropsList {
  friends: IFriend[];
  type: 'suggest' | 'request';
  setFriends: (friends: IFriend[]) => any;
}

export const FriendList: React.FC<PropsList> = ({ friends, type, setFriends }) => {
  return friends.length !== 0 ? (
    <StyledList>
      {friends.map((_friend, index) => {
        return (
          <li key={_friend.id}>
            <Friend friend={_friend} index={index} type={type} setFriends={setFriends} friends={friends} />
          </li>
        );
      })}
    </StyledList>
  ) : (
    <Typography
      variant="body1"
      sx={{
        fontSize: '1.4rem',
        textAlign: 'center',
        margin: '3rem 0',
      }}
    >
      Không có dữ liệu
    </Typography>
  );
};

export const Friend: React.FC<PropsItem> = ({ friend, index, type, setFriends, friends }) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(authSelector);

  const handleAddFriend = async (id: string, _index: number) => {
    try {
      await isekaiApi.addFriend(id);
      dispatch(
        addToast({
          content: 'Thêm bạn bè thành công',
          id: v4(),
          type: 'success',
        }),
      );
      setFriends(
        [...friends].map((_friend, index) => {
          if (index === _index) {
            return {
              ..._friend,
              status: 'pending',
            };
          }
          return _friend;
        }),
      );
    } catch (error) {
      dispatch(
        addToast({
          content: 'Thêm bạn bè thất bại',
          id: v4(),
          type: 'error',
        }),
      );
    }
  };

  const handleResponse = async (
    id: string,
    _index: number,
    status: 'none' | 'accepted' | 'pending',
    type: 'suggest' | 'request',
  ) => {
    try {
      if (id) {
        await isekaiApi.responseFriendRequest(id, status);
        dispatch(
          addToast({
            content: status === 'none' ? 'Hủy lời mời bạn thành công' : 'Đã chấp nhận kết bạn',
            id: v4(),
            type: 'success',
          }),
        );
        setFriends(
          [...friends].map((_friend, index) => {
            if (index === _index) {
              return {
                ..._friend,
                status: status,
              };
            }
            return _friend;
          }),
        );
      }
    } catch (error) {}
  };

  const handleRemoveFriend = async (id: string) => {
    try {
      await isekaiApi.removeFriend(id);
      dispatch(
        addToast({
          content: 'Hủy kết bạn thành công',
          id: v4(),
          type: 'success',
        }),
      );
      setFriends(
        [...friends].filter((_friends) => {
          return _friends.id !== id;
        }),
      );
    } catch (error) {}
  };

  const button = () => {
    if (friend.id === currentUser?.id) {
      return null;
    }

    switch (friend.status) {
      case 'none':
        return (
          <Button
            onClick={() => {
              handleAddFriend(friend.id, index);
            }}
          >
            Kết bạn
          </Button>
        );
      case 'accepted':
        return (
          <Button
            className="button-friend"
            onClick={() => {
              handleRemoveFriend(friend.id);
            }}
          >
            Huỷ kết bạn
          </Button>
        );
      case 'pending':
        if (type === 'suggest') {
          return (
            <Button
              onClick={() => {
                handleResponse(friend.id, index, 'none', type);
              }}
            >
              Hủy lời mời kết bạn
            </Button>
          );
        }

        return (
          <Button
            onClick={() => {
              handleResponse(friend.id, index, 'accepted', type);
            }}
          >
            Chấp nhận kết bạn
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <StyledItem>
      <div className="avatar">
        <div className="avatar-inner">
          <Avatar src={friend.avatar} alt={friend.username} />
        </div>
      </div>
      <h4>{friend.username}</h4>
      <>{button()}</>
    </StyledItem>
  );
};
