import { Avatar, Stack } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'share/types';
import { AvatarWrap, StyledUserLiked, UserPreview } from './Styles';

interface Props {
  user: User;
}

const UserLiked: React.FC<Props> = ({ user }) => {
  const { user: currentUser } = useAppSelector(authSelector);
  const navigate = useNavigate();
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
        {user.id !== currentUser?.id && (
          <div
            className="message"
            onClick={() => {
              navigate(`/message/${user.id}`);
            }}
          >
            <AiOutlineMessage />
          </div>
        )}
      </UserPreview>
    </StyledUserLiked>
  );
};

export default UserLiked;
