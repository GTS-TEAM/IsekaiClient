import { Avatar, Stack } from '@mui/material';
import { IMG } from 'images';
import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { User } from 'share/types';
import { AvatarWrap, StyledUserLiked, UserPreview } from './Styles';

interface Props {
  user: User;
}

const UserLiked: React.FC<Props> = ({ user }) => {
  return (
    <StyledUserLiked>
      <AvatarWrap>
        <Avatar src={user.avatar} alt={user.username} sx={{ width: 28, height: 28 }} />
      </AvatarWrap>
      <UserPreview>
        <div className="img">
          <img src={user.background ? user.background : IMG.BgImgCoverProfile} alt="" className="bg-cover" />
          <img src={user.avatar} alt="" className="user-img" />
        </div>
        <Stack sx={{ rowGap: '1.2rem' }}>
          <Link to={`/profile/${user.id}`}>
            <span className="username">{user.username}</span>
          </Link>
          <span className="bio">{user.bio ? user.bio : 'No bio'}</span>
        </Stack>
        <div className="message">
          <AiOutlineMessage />
        </div>
      </UserPreview>
    </StyledUserLiked>
  );
};

export default UserLiked;
