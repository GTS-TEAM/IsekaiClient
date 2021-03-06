import { Avatar, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import emotions from 'utils/emotions';
import { StyledUserBlockPost } from './Styles';

interface Props {
  userImg: string;
  userId: string;
  userName: string;
  time?: string;
  emoji?: string | number | null;
  className?: string;
}

const UserBlockPost: React.FC<Props> = ({ userImg, userId, userName, time, emoji, className }) => {
  const emotion = useMemo(() => emotions.find((emotion) => emotion.id === emoji), [emoji]);

  return (
    <StyledUserBlockPost className={className}>
      <Stack direction="row" columnGap="1.6rem" alignItems="center">
        <Link to={`/profile/${userId}`}>
          <Avatar src={userImg} />
        </Link>
        <Stack rowGap="0.5rem" sx={{ color: 'var(--fds-gray-9)' }}>
          <Stack direction="row" columnGap="0.5rem" alignItems="center">
            <Link to={`/profile/${userId}`}>
              <Stack direction="row" columnGap="0.5rem" alignItems="center">
                <Typography variant="h3" fontSize="1.4rem" fontWeight="500">
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
              {moment(new Date(time).toUTCString()).fromNow()}
            </span>
          )}
        </Stack>
      </Stack>
    </StyledUserBlockPost>
  );
};

export default React.memo(UserBlockPost);
