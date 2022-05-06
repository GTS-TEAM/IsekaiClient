import { isekaiApi } from 'api/isekaiApi';
import React, { useEffect, useState } from 'react';
import { IFriend } from 'share/types';
import { FriendList } from '../Friend';
import Header from '../Header';

const Request = () => {
  const [friendsRequest, setFriendsRequest] = useState<IFriend[]>([]);

  useEffect(() => {
    isekaiApi
      .getFriendsRequest()
      .then((value) => {
        setFriendsRequest(
          [...value.data].map((item) => {
            const _friend: IFriend = {
              ...item.creator,
              status: item.status,
            };
            return _friend;
          }),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <Header title="Lời mời kết bạn" />
        <div>
          <FriendList friends={friendsRequest} type="request" setFriends={setFriendsRequest} />
        </div>
      </div>
    </div>
  );
};

export default Request;
