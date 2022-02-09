import { Button, Menu } from '@mui/material';
import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { StyledMore, StyledMenuItem } from './Styles';
const More = ({
  anchorEl,
  open,
  onOpenMenu,
  onCloseMenu,
  onClickOpenEdit,
  onClickRemove,
  height,
  width,
  heightIcon,
  widthIcon,
}) => {
  return (
    <StyledMore height={height} width={width} heightIcon={heightIcon} widthIcon={widthIcon}>
      <Button onClick={onOpenMenu}>
        <BsThreeDots />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={onCloseMenu} autoFocus={false}>
        <StyledMenuItem onClick={onClickOpenEdit}>
          <AiOutlineEdit />
          Chỉnh sửa
        </StyledMenuItem>
        <StyledMenuItem onClick={onClickRemove}>
          <IoMdRemoveCircleOutline />
          Xóa
        </StyledMenuItem>
      </Menu>
    </StyledMore>
  );
};

export default More;
