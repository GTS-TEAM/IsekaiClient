import { Typography } from '@mui/material';
import { authSelector } from 'features/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputBio from './InputBio';
import { BioHeader, Body, ButtonEdit, StyledInfo, Text } from './Styles';

interface Props {
  bio: string;
  userId: string;
}

const Info: React.FC<Props> = ({ bio, userId }) => {
  const { user: currentUser } = useSelector(authSelector);
  const [openInput, setOpenInput] = useState(false);

  const toggleInputHandler = () => {
    setOpenInput(!openInput);
  };

  const closeInputHandler = () => {
    setOpenInput(false);
  };

  return (
    <StyledInfo>
      <BioHeader>
        <Typography variant="h4" fontWeight={500} sx={{ color: 'var(--fds-black-1)' }}>
          Thông tin
        </Typography>
      </BioHeader>
      <Body>
        {!openInput && <Text>{bio && bio?.length > 0 ? bio : 'No bio'}</Text>}
        {openInput && <InputBio bio={bio && bio?.length > 0 ? bio : ''} onClose={closeInputHandler} />}
        {!openInput && userId === currentUser?.id && (
          <ButtonEdit onClick={toggleInputHandler}>
            {bio && bio?.length > 0 ? 'Chỉnh sửa tiểu sử' : 'Thêm tiểu sử'}
          </ButtonEdit>
        )}
      </Body>
    </StyledInfo>
  );
};

export default Info;
