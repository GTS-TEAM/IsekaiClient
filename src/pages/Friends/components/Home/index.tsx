import { Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import React, { useEffect, useState } from 'react';
import { IFriend } from 'share/types';
import { FriendList } from '../Friend';
import Header from '../Header';

const Home = () => {
  const [friendsSuggest, setFriendsSuggest] = useState<IFriend[]>([]);
  const [friendsRequest, setFriendsRequest] = useState<IFriend[]>([]);

  useEffect(() => {
    Promise.all([isekaiApi.getSuggestFriend(), isekaiApi.getFriendsRequest()]).then((values) => {
      const [dataSuggest, dataRequest] = values;
      console.log(dataRequest.data);
      setFriendsRequest(
        [...dataRequest.data].map((item) => {
          const _friend: IFriend = {
            ...item.creator,
            status: item.status,
          };
          return _friend;
        }),
      );
      setFriendsSuggest(dataSuggest.data);
    });
  }, []);

  return (
    <Stack gap={'1.8rem'}>
      <div>
        <Header title="Gợi ý" path="/friends/suggest" />
        <div>
          <FriendList friends={friendsSuggest} type="suggest" setFriends={setFriendsSuggest} />
        </div>
      </div>
      <div>
        <Header title="Lời mời kết bạn" path="/friends/request" />
        <div>
          <FriendList friends={friendsRequest} type="request" setFriends={setFriendsRequest} />
        </div>
      </div>
    </Stack>
  );
};

export default Home;
