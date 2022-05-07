import { isekaiApi } from 'api/isekaiApi';
import React, { useEffect, useState } from 'react';
import { IFriend } from 'share/types';
import { FriendList } from '../Friend';
import Header from '../Header';

const Suggest = () => {
  const [friendsSuggest, setFriendsSuggest] = useState<IFriend[]>([]);

  useEffect(() => {
    isekaiApi
      .getSuggestFriend(100, 1)
      .then((value) => {
        setFriendsSuggest(value.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <Header title="Gợi ý" />
        <div>
          <FriendList friends={friendsSuggest} type="suggest" setFriends={setFriendsSuggest} />
        </div>
      </div>
    </div>
  );
};

export default Suggest;
