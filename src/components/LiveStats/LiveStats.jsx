import { Stack } from '@mui/material';
import React from 'react';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { StyledLiveStats } from './Styles';
const LiveStats = ({ totalLike, totalComment }) => {
  return totalComment !== 0 || totalLike !== 0 ? (
    <StyledLiveStats>
      {totalLike !== 0 && (
        <Stack direction="row" alignItems="center" columnGap="0.5rem">
          <AiOutlineHeart />
          <span>{totalLike}</span>
        </Stack>
      )}
      {totalComment !== 0 && (
        <Stack direction="row" alignItems="center" columnGap="0.5rem">
          <AiOutlineMessage />
          <span>{totalComment}</span>
        </Stack>
      )}
      <span>{totalComment} bình luận</span>
    </StyledLiveStats>
  ) : null;
};

export default LiveStats;
