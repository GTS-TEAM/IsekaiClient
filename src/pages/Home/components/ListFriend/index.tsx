import { Avatar } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { User } from 'share/types';
import { Card, CardBody, CardHeading } from './styles';

const ListFriend = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const { user } = useAppSelector(authSelector);

  useEffect(() => {
    const getListFriend = async () => {
      if (user) {
        const { data } = await isekaiApi.getSuggestFriend();

        console.log(data);
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
        {friends.map((friend) => (
          <div className="add-friend-block">
            <Avatar src={friend.avatar} alt={friend.username} />
            <div className="page-meta">
              <span>{friend.username}</span>
            </div>
            <div
              className="add-friend"
              onClick={async () => {
                try {
                  await isekaiApi.addFriend(friend.id);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
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
