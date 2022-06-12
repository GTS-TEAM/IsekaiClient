import styled from '@emotion/styled';
import { Avatar, IconButton, Slider, Stack } from '@mui/material';
import { useAudio } from 'hooks/useAudio';
import { IMG } from 'images';
const Control = () => {
  const audioCtx = useAudio();

  return (
    <StyledControl>
      <div className="progress-main">
        <Slider
          min={0}
          max={audioCtx?.duration}
          value={audioCtx?.currentDuration}
          step={1}
          onChange={audioCtx?.handleChangeDuration}
        />
      </div>
      <div className="control-info">
        <Avatar
          src={audioCtx?.currentSong?.uploader.background as string}
          alt={audioCtx?.currentSong?.name as string}
          sx={{
            width: '6rem',
            height: '6rem',
            borderRadius: '0px',
            marginRight: '1.6rem',
          }}
        />
        <div className="info">
          <h3>{audioCtx?.currentSong?.name}</h3>
          <span>{audioCtx?.currentSong?.author}</span>
        </div>
      </div>
      <div className="control-action">
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
      </div>
      <div className="control-progress">
        <Slider min={0} max={1} value={audioCtx?.volume} onChange={audioCtx?.handleChangeVolume} step={0.1} />
      </div>
    </StyledControl>
  );
};

export default Control;

const StyledControl = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background-color: #2c2c2c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--fds-white);
  padding-right: 2.4rem;

  .progress-main {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    width: 100%;

    .MuiSlider-root {
      width: 100%;
      padding: 0;
      height: 3px;
      border-radius: 0px;
      color: var(--fds-white);
    }

    .MuiSlider-track,
    .MuiSlider-rail {
      height: 5px;
    }

    .MuiSlider-thumb {
      display: none;
    }
  }

  .control-info {
    display: flex;
    align-items: center;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.4rem;
    }
  }

  .control-action {
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .control-progress {
    .MuiSlider-root {
      width: 10rem;
      color: var(--fds-white);

      .MuiSlider-rail {
      }
    }
  }
`;
