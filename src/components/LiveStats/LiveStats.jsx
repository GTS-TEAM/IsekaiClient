import React from 'react';
import PropTypes from 'prop-types';
import { AvatarGroup, Stack } from '@mui/material';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { LikerGroup, LikerText, StyledLiveStats } from './Styles';
import UserLiked from './UserLiked';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from 'features/authSlice';
const LiveStats = ({ totalLike, totalComment, userLiked, className, haveUserLiked }) => {
  const { user: currentUser } = useSelector(authSelector);

  return totalComment !== 0 || totalLike !== 0 ? (
    <StyledLiveStats className={className}>
      {haveUserLiked ? (
        <LikerGroup>
          <AvatarGroup max={3} sx={{ marginLeft: '0.8rem' }}>
            {userLiked.map((user) => (
              <UserLiked user={user} key={user.id} />
            ))}
          </AvatarGroup>
          <LikerText>
            <Stack direction="row">
              {userLiked.slice(0, 2).map((user) => (
                <Link to={`/profile/${user.id}`} key={user.id}>
                  {user.id === currentUser.id ? 'You' : user.username}
                </Link>
              ))}
            </Stack>
            <span>{userLiked.length - 2 > 0 ? `Và ${userLiked.length - 2} người khác` : null}</span>
          </LikerText>
        </LikerGroup>
      ) : (
        <Stack direction="row" columnGap="1rem" alignItems="center">
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
        </Stack>
      )}
      <span>{totalComment} bình luận</span>
    </StyledLiveStats>
  ) : null;
};

LiveStats.propTypes = {
  userLiked: PropTypes.array,
  totalLike: PropTypes.number.isRequired,
  totalComment: PropTypes.number.isRequired,
  className: PropTypes.string,
  haveUserLiked: PropTypes.bool,
};

export default LiveStats;
