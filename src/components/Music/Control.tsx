import { Avatar, Box, IconButton, Slider, Stack } from '@mui/material';
import { useAudio } from 'hooks/useAudio';
import { IMG } from 'images';
import { BsFillVolumeDownFill, BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';
import Progress from './Progress';
import { StyledControl, VolumeWrap } from './Styles';

const Control = () => {
  const audioCtx = useAudio();

  return (
    <StyledControl>
      <Box
        sx={{
          display: 'flex',
          columnGap: '1.2rem',
          '& .MuiAvatar-root ': {
            width: '10rem',
            height: '10rem',
            borderRadius: 'var(--borderRadius1)',
          },
        }}
      >
        <Avatar src={audioCtx?.currentSong?.uploader.avatar} alt="" />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1.2rem',
          }}
        >
          <span className="uploader">{audioCtx?.currentSong?.uploader.username}</span>
          <h3 className="song-name">{audioCtx?.currentSong?.name}</h3>
          <span className="song-author">
            {audioCtx?.currentSong?.author ? audioCtx?.currentSong.author : 'Không xác định'}
          </span>
        </Box>
      </Box>
      <Progress />
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
        <IconButton onClick={audioCtx?.prevSongHandler}>
          <IMG.Prev className="prev" />
        </IconButton>
        <IconButton
          onClick={() => {
            audioCtx?.setIsPlaying(!audioCtx?.isPlaying as boolean);
          }}
        >
          {audioCtx?.isPlaying ? <IMG.Play className="play" /> : <IMG.Pause className="pause" />}
        </IconButton>
        <IconButton onClick={audioCtx?.nextSongHandler}>
          <IMG.Next className="next" />
        </IconButton>
      </Stack>
      <VolumeWrap>
        {audioCtx?.volume ? <BsFillVolumeDownFill /> : <BsFillVolumeMuteFill />}
        <Slider min={0} max={1} step={0.1} value={audioCtx?.volume} onChange={audioCtx?.handleChangeVolume} />
        <BsFillVolumeUpFill />
      </VolumeWrap>
    </StyledControl>
  );
};

export default Control;
