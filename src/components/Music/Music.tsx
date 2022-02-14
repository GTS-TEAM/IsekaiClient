import { Stack } from '@mui/material';
import { getListMusic, musicSelector } from 'features/musicSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import Control from './Control';
import Header from './Header';
import { ListSong, Song, StyledMusic } from './Styles';
// ((http(s):\/\/))((youtu.be\/))[\S]+ input upload youtube
const Music = () => {
  const dispatch = useAppDispatch();
  const { musics } = useAppSelector(musicSelector);

  useEffect(() => {
    dispatch(getListMusic());
  }, [dispatch]);

  return (
    <StyledMusic>
      <Header />
      <ListSong>
        {musics.map((item) => (
          <Song key={item.id}>
            <Stack rowGap="0.8rem">
              <div className="song-name">
                <h3>{item.name}</h3>
              </div>
              <span className="song-author">{item.author ? item.author : 'Không xác định'}</span>
            </Stack>
            <div></div>
          </Song>
        ))}
      </ListSong>
      <Control />
    </StyledMusic>
  );
};

export default Music;
