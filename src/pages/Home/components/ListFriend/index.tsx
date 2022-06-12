import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { selectPopupChat } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import { StyledBadge } from 'pages/Chat/components/Header/styles';
import React, { useEffect, useState } from 'react';
import { ConversationItem, ConversationType, User } from 'share/types';
import { v4 } from 'uuid';
import { StyledFriend, StyledListFriend } from './styles';

const ListFriend = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const chooseConversation = async (friend: User) => {
    try {
      const { data } = await isekaiApi.getConversationByReceiverId(friend.id);
      dispatch(
        selectPopupChat({
          receiverId: friend.id,
          currentConversation: data,
        }),
      );
    } catch (error) {
      const newConversation: ConversationItem = {
        id: `${user?.id}-${friend.id}`,
        members: [
          {
            id: v4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...friend,
              last_activity: null,
            },
          },
          {
            id: v4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...user,
              last_activity: null,
            },
          },
        ],
        type: ConversationType.PRIVATE,
        last_message: null,
        avatar: null,
        name: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        theme: '#a56ffd',
      };
      dispatch(
        selectPopupChat({
          receiverId: friend.id,
          currentConversation: newConversation,
        }),
      );
    }
  };

  useEffect(() => {
    const getListFriend = async () => {
      const { data } = await isekaiApi.getListFriend();
      setFriends(data);
    };
    getListFriend();
  }, []);

  return (
    <StyledListFriend>
      <div className="title">Người liên hệ</div>
      <ul>
        {friends.map((friend) => (
          <React.Fragment key={friend.id}>
            <li
              onClick={(e) => {
                e.stopPropagation();
                chooseConversation(friend);
              }}
            >
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
              </StyledFriend>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </StyledListFriend>
  );
};

export default React.memo(ListFriend);
