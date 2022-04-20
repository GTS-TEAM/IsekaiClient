import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { selectPopupChat } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { ConversationItem, ConversationType, User } from 'share/types';
import { v4 } from 'uuid';
import { Card, CardBody, CardHeading } from './styles';

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
    // <StyledListFriend>
    //   <div className="title">Người liên hệ</div>
    //   <ul>
    //     {friends.map((friend) => (
    //       <React.Fragment key={friend.id}>
    //         <li
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             chooseConversation(friend);
    //           }}
    //         >
    //           <StyledFriend>
    //             <Avatar src={friend.avatar} alt={friend.username} />
    //             <span>{friend.username}</span>
    //           </StyledFriend>
    //         </li>
    //       </React.Fragment>
    //     ))}
    //   </ul>
    // </StyledListFriend>
    <Card>
      <CardHeading>
        <h4>Suggested friends</h4>
      </CardHeading>
      <CardBody>
        {friends.map((friend) => (
          <div className="add-friend-block">
            <Avatar src={friend.avatar} alt={friend.username} />
            <div className="page-meta">
              <span>{friend.username}</span>
            </div>
            <div className="add-friend">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-user-plus"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default React.memo(ListFriend);
