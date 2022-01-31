import { Button, IconButton, MenuItem } from '@mui/material';
import { IMG } from 'images';
import React, { useState } from 'react';
import {
  AiFillCamera,
  AiOutlineStock,
  AiOutlineInfoCircle,
  AiOutlineUser,
  AiOutlineFileImage,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import {
  StyledCoverImg,
  BgCover,
  CoverOverLay,
  InputImgTrigger,
  MenuDropdown,
  Dropdown,
  MenuChooseChangeBgCover,
} from './Styles';
import { authSelector } from '../../../../features/authSlice';
const CoverImg = ({ imgBgUrl, onChangeBgCover, userImg, userId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElChangeBgCover, setAnchorElChangeBgCover] = useState(null);
  const { user: currentUser } = useSelector(authSelector);
  const clickOpenChangeBgHandler = (e) => {
    setAnchorElChangeBgCover(e.currentTarget);
  };

  const closeChangeBgHandler = () => {
    setAnchorElChangeBgCover(null);
  };

  const handleClickOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCoverImg>
      <BgCover src={imgBgUrl || IMG.BgImgCoverProfile} />
      <CoverOverLay />
      <Avatar userImg={userImg} userId={userId} />
      {currentUser.id === userId && (
        <InputImgTrigger>
          <Button
            aria-controls={Boolean(anchorElChangeBgCover) ? 'meu-chose-type' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorElChangeBgCover) ? 'true' : undefined}
            onClick={clickOpenChangeBgHandler}
          >
            <AiFillCamera />
            <span>Thêm ảnh bìa</span>
          </Button>
          <MenuChooseChangeBgCover
            onClose={closeChangeBgHandler}
            open={Boolean(anchorElChangeBgCover)}
            anchorEl={anchorElChangeBgCover}
          >
            <MenuItem>
              <AiOutlineFileImage />
              <span>Chọn ảnh</span>
            </MenuItem>
            <MenuItem>
              <AiOutlineUpload />
              <span>Tải lên</span>
            </MenuItem>
          </MenuChooseChangeBgCover>
        </InputImgTrigger>
      )}
      <MenuDropdown>
        <IconButton
          onClick={handleClickOpenDropdown}
          aria-controls={Boolean(anchorEl) ? 'menu-dropdown' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        >
          <BsThreeDotsVertical />
        </IconButton>
        <Dropdown open={Boolean(anchorEl)} onClose={handleCloseDropdown} anchorEl={anchorEl}>
          <MenuItem>
            <AiOutlineStock />
            <span>Dòng thời gian</span>
          </MenuItem>
          <MenuItem>
            <AiOutlineInfoCircle />
            <span>Gới thiệu</span>
          </MenuItem>
          <MenuItem>
            <AiOutlineUser />
            <span>Bạn bè</span>
          </MenuItem>
          <MenuItem>
            <AiOutlineFileImage />
            <span>Ảnh</span>
          </MenuItem>
        </Dropdown>
      </MenuDropdown>
    </StyledCoverImg>
  );
};

export default CoverImg;
