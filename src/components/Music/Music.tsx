import { Stack } from '@mui/material';
import { musicSelector, setCurrentSong } from 'features/musicSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { MusicItem } from 'share/types';
import Control from './Control';
import Header from './Header';
import { ListSong, Song, StyledMusic } from './Styles';
import UploadMusic from './UploadMusic';
const Music = () => {
  const dispatch = useAppDispatch();
  const { musics, currentSong } = useAppSelector(musicSelector);

  const selectCurrentSong = (music: MusicItem) => () => {
    dispatch(setCurrentSong(music));
  };

  return (
    <StyledMusic>
      <Header />
      <ListSong>
        {musics.map((item) => (
          <Song key={item.id} onClick={selectCurrentSong(item)} active={currentSong?.id === item.id}>
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
      <UploadMusic />
    </StyledMusic>
  );
};

export default Music;
