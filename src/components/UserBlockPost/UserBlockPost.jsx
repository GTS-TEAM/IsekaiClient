import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import emotions from 'utils/emotions';
import { StyledUserBlockPost } from './Styles';

const UserBlockPost = ({ userImg, userId, userName, time, emoji }) => {
  const emotion = emotions.find((emotion) => emotion.id === emoji);
  return (
    <StyledUserBlockPost>
      <Stack direction="row" columnGap="1.6rem" alignItems="center">
        <Link to={`/profile/${userId}`}>
          <Avatar src={userImg} />
        </Link>
        <Stack rowGap="0.5rem" sx={{ color: 'var(--fds-gray-9)' }}>
          <Stack direction="row" columnGap="0.5rem" alignItems="center">
            <Link to={`/profile/${userId}`}>
              <Stack direction="row" columnGap="0.5rem" alignItems="center">
                <Typography variant="h2" fontSize="1.4rem" fontWeight="500">
                  {userName}
                </Typography>
              </Stack>
            </Link>
            <Typography variant="h2" fontSize="1.4rem" fontWeight="500">
              <Stack direction="row" columnGap="0.5rem" alignItems="center">
                {emotion && ` đang cảm thấy ${emotion.name}`}
                {emotion && <img src={emotion.icon} alt="" className="emoji" />}
              </Stack>
            </Typography>
          </Stack>
          {time && (
            <span style={{ fontSize: '1.3rem', color: 'var(--fds-gray-1)' }}>
              {moment(time, moment.defaultFormat).fromNow()}
            </span>
          )}
        </Stack>
      </Stack>
    </StyledUserBlockPost>
  );
};

export default UserBlockPost;
