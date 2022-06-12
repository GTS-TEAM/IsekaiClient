import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { getListMusic, musicSelector, setCurrentSong, unMount } from 'features/musicSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useAudio } from 'hooks/useAudio';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const LIMIT = 10;

const ListMusic = () => {
  const [page, setPage] = useState<number>(1);
  const { musics, hasMore } = useAppSelector(musicSelector);
  const dispatch = useAppDispatch();
  const audioCtx = useAudio();

  const handleMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    dispatch(unMount('hasMore'));
    dispatch(
      getListMusic({
        page,
        limit: LIMIT,
        type: 'hasMore',
      }),
    );
    return () => {
      dispatch(unMount('hasMore'));
    };
  }, [page, dispatch]);

  return (
    <div className="list-music-wrap">
      <InfiniteScroll
        className="list"
        loader={<p>Loading...</p>}
        hasMore={hasMore}
        next={handleMore}
        dataLength={musics.length}
        scrollableTarget="list-music-wrap"
      >
        {musics.map((_music, index) => {
          return (
            <Music
              key={_music.id}
              onClick={() => {
                dispatch(setCurrentSong(_music));
                audioCtx?.setIsPlaying(true);
              }}
            >
              <div className="order">{index}</div>
              <Avatar src={_music.uploader.avatar} alt={_music.uploader.username} />
              <div className="info">
                <h3>{_music.name}</h3>
                <span>{_music.author}</span>
              </div>
            </Music>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

const Music = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  cursor: pointer;

  .order {
    margin: 0 1.6rem;
    width: 2rem;
    font-size: 1.4rem;
    text-align: center;
  }

  .MuiAvatar-root {
    margin-right: 1.6rem;
    border-radius: 4px;
  }

  h3 {
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
  }
`;

export default ListMusic;
