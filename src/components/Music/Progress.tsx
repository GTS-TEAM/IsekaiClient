import { Slider } from '@mui/material';
import React from 'react';
import { formatDuration } from 'utils/formatDuration';
import { DurationWrap } from './Styles';

interface Props {
  audio: any;
  duration: number;
  currentDuration: number;
  setCurrentDuration: (value: number) => any;
}

const Progress: React.FC<Props> = ({ audio, duration, currentDuration, setCurrentDuration }) => {
  const changeDurationHandler = (event: Event, newValue: number | number[]) => {
    audio.currentTime = newValue as number;
    setCurrentDuration(newValue as number);
  };

  return (
    <div>
      <Slider value={currentDuration} step={1} onChange={changeDurationHandler} min={0} max={duration} />
      <DurationWrap>
        <div className="left">{formatDuration(currentDuration)}</div>
        <div className="right">{formatDuration(duration)}</div>
      </DurationWrap>
    </div>
  );
};

export default Progress;
