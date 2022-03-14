import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { chatSelector, selectConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import PopupChat from 'pages/Chat/components/PropupChat';
import React, { useEffect, useState } from 'react';
import { ConversationItem, ConversationType, User } from 'share/types';
import { v4 } from 'uuid';
import { StyledFriend, StyledListFriend } from './styles';

const ListFriend = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [activePopup, setActivePopup] = useState('');
  const { user } = useAppSelector(authSelector);
  const { currentConversation } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  const chooseConversation = (friend: User) => {
    setActivePopup(friend.id);
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
    dispatch(selectConversation(newConversation));
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
                <Avatar src={friend.avatar} alt={friend.username} />
                <span>{friend.username}</span>
              </StyledFriend>
            </li>
            {activePopup === friend.id && (
              <PopupChat
                conversationId={friend.id}
                onClose={() => {
                  setActivePopup('');
                }}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </StyledListFriend>
  );
};

export default React.memo(ListFriend);
