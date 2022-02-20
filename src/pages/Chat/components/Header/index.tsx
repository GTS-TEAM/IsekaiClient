import { Avatar, ClickAwayListener } from '@mui/material';
import { Box } from '@mui/system';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiFileBlank } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineColorLens, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { ButtonMore, RecipientBox, StyledHeader } from './styles';

const Header = () => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  return (
    <StyledHeader>
      <RecipientBox>
        <Avatar />
        <Box>
          <h3>Minh Nguyen</h3>
          <span>Hoạt Động 10 phút trước</span>
        </Box>
      </RecipientBox>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <ButtonMore
          onClick={() => {
            setIsShowDropdown(!isShowDropdown);
          }}
        >
          <BsThreeDotsVertical />
        </ButtonMore>
        {isShowDropdown && (
          <ClickAwayListener
            onClickAway={() => {
              setIsShowDropdown(false);
            }}
          >
            <DropdownMenu top="calc(100% + 1.2rem)" right="0">
              <DropdownContent>
                <DropdownItem>
                  <BiFileBlank />
                  <Box>
                    <h3>Tệp</h3>
                    <span>Xem tất cả tệp bạn đã gởi</span>
                  </Box>
                </DropdownItem>
                <DropdownItem>
                  <MdOutlineRemoveCircleOutline />
                  <Box>
                    <h3>Xóa</h3>
                    <span>Xóa cuộc trò chuyện</span>
                  </Box>
                </DropdownItem>
                <DropdownItem>
                  <AiOutlineUser />
                  <Box>
                    <h3>Trang cá nhân</h3>
                    <span>Chuyển tới trang cá nhân của Minh Nguyên</span>
                  </Box>
                </DropdownItem>
                <DropdownItem>
                  <MdOutlineColorLens />
                  <Box>
                    <h3>Tùy chỉnh</h3>
                    <span>Thay đổi màu của cuộc trò chuyện</span>
                  </Box>
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </ClickAwayListener>
        )}
      </Box>
    </StyledHeader>
  );
};

export default Header;
