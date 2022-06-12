import { Slider } from '@mui/material';
import { useAudio } from 'hooks/useAudio';
import React from 'react';
import { formatDuration } from 'utils/formatDuration';
import { DurationWrap } from './Styles';

const Progress: React.FC = () => {
  const audioCtx = useAudio();
  return (
    <div>
      <Slider
        value={audioCtx?.currentDuration as number}
        step={1}
        onChange={audioCtx?.handleChangeDuration}
        min={0}
        max={audioCtx?.duration}
      />
      <DurationWrap>
        <div className="left">{formatDuration(audioCtx?.currentDuration as number)}</div>
        <div className="right">{formatDuration(audioCtx?.duration as number)}</div>
      </DurationWrap>
    </div>
  );
};

export default Progress;
