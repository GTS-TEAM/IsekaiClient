import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { IFriend } from 'share/types';
import { FriendList } from '../Friend';
import Header from '../Header';

const AllFriend = () => {
  const [allFriend, setAllFriend] = useState<IFriend[]>([]);
  const { user } = useAppSelector(authSelector);
  useEffect(() => {
    if (user) {
      isekaiApi
        .getListFriend(user.id)
        .then((value) => {
          setAllFriend(
            [...value.data].map((_friend) => {
              return {
                ..._friend,
                status: 'accepted',
              };
            }),
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div>
      <div>
        <Header title="Tất cả bạn bè" />
        <div>
          <FriendList friends={allFriend} type="request" setFriends={setAllFriend} />
        </div>
      </div>
    </div>
  );
};

export default AllFriend;
