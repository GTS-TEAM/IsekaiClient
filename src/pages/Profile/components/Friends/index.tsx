import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'share/types';
import { StyledFriends } from './styles';

const Friends: React.FC<{
  friends: User[];
}> = ({ friends }) => {
  return (
    <StyledFriends>
      <div className="header">
        <Typography variant="h4" fontWeight={500} sx={{ color: 'var(--fds-black-1)' }}>
          Bạn bè
        </Typography>
      </div>
      <ul className="list">
        {friends.slice(0, 9).map((_f) => {
          return (
            <li>
              <Link to={`/profile/${_f.id}`}>
                <Avatar src={_f.avatar} alt={_f.username} />
              </Link>
              <h4>{_f.username}</h4>
            </li>
          );
        })}
      </ul>
    </StyledFriends>
  );
};

export default Friends;
