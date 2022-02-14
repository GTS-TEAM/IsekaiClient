import { Box, IconButton, Slider, Stack } from '@mui/material';
import { musicSelector, nextIndexSong } from 'features/musicSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillVolumeDownFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { MusicItem } from 'share/types';
import Progress from './Progress';
import { StyledControl, VolumeWrap } from './Styles';

const Control = () => {
  const { indexCurrentSong, musics } = useAppSelector(musicSelector);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [volume, setVolume] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  const [currentSong, setCurrentSong] = useState<MusicItem>();
  const dispatch = useAppDispatch();
  const audioRef = useRef<any>();

  const togglePlayBtn = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // const changeVolumeHandler = (event: Event, newValue: number | number[]) => {
  //   // setVolume(newValue as number);
  // };

  const nextSongHandler = () => {
    dispatch(nextIndexSong());
    setCurrentDuration(0);
    setCurrentSong(musics[indexCurrentSong]);
  };

  useEffect(() => {
    setCurrentSong(musics[0]);
  }, [musics]);

  return (
    <StyledControl>
      <audio
        controls
        style={{ display: 'none' }}
        ref={audioRef}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          dispatch(nextIndexSong());
        }}
        onTimeUpdate={() => setCurrentDuration(audioRef.current.currentTime)}
        src={currentSong?.url}
      ></audio>
      <Box
        sx={{
          display: 'flex',
          columnGap: '1.2rem',
          '& img ': {
            width: '10rem',
            height: '10rem',
            borderRadius: 'var(--borderRadius1)',
          },
        }}
      >
        <img src={currentSong?.uploader.avatar} alt="" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1.2rem',
          }}
        >
          <span className="uploader">{currentSong?.uploader.username}</span>
          <h3 className="song-name">{currentSong?.name}</h3>
          <span className="song-author">{currentSong?.author ? currentSong.author : 'Không xác định'}</span>
        </Box>
      </Box>
      <Progress
        audio={audioRef.current}
        duration={duration}
        currentDuration={currentDuration}
        setCurrentDuration={setCurrentDuration}
      />
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',

          '& .MuiButtonBase-root': {
            color: 'var(--fds-white)',
          },

          svg: {
            fill: 'var(--fds-white)',
          },

          '& .play,.pause': {
            width: '3.6rem',
            height: '3.6rem',
          },
        }}
      >
        <IconButton>
          <IMG.Prev className="prev" />
        </IconButton>
        <IconButton onClick={togglePlayBtn}>
          {isPlaying ? <IMG.Play className="play" /> : <IMG.Pause className="pause" />}
        </IconButton>
        <IconButton onClick={nextSongHandler}>
          <IMG.Next className="next" />
        </IconButton>
      </Stack>
      <VolumeWrap>
        <BsFillVolumeDownFill />
        <Slider />
        <BsFillVolumeUpFill />
      </VolumeWrap>
    </StyledControl>
  );
};

export default Control;
