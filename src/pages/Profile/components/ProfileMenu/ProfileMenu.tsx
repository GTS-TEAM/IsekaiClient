import { Button, Stack } from '@mui/material';
import React from 'react';
import { StyledProfileMenu } from './Styles';

const ProfileMenu = () => {
  return (
    <StyledProfileMenu>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" columnGap="1rem" className="stack" justifyItems="flex-start">
          <Button>Dòng thời gian</Button>
          <Button>Thông tin</Button>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap="1rem" className="stack" justifyContent="flex-end">
          <Button>Bạn bè</Button>
          <Button>Ảnh</Button>
        </Stack>
      </Stack>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
