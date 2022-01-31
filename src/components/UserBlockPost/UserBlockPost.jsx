import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const UserBlockPost = ({ userImg, userId, userName, time }) => {
  return (
    <Stack direction="row" columnGap="1.4rem" alignItems="center">
      <Link to={`/profile/${userId}`}>
        <Avatar src={userImg} />
      </Link>
      <Stack rowGap="0.5rem">
        <Link to={`/profile/${userId}`}>
          <Typography variant="h2" fontSize="1.4rem" fontWeight="500">
            {userName}
          </Typography>
        </Link>
        <span style={{ fontSize: '1.3rem', color: 'var(--fds-gray-1)' }}>
          {moment(time, moment.defaultFormat).fromNow()}
        </span>
      </Stack>
    </Stack>
  );
};

export default UserBlockPost;
