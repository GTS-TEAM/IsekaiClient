import { Avatar, ClickAwayListener } from '@mui/material';
import { Box } from '@mui/system';
import { chatSelector } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiFileBlank } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineColorLens, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { ConversationType } from 'share/types';
import { RecipientBox, StyledButtonIcon, StyledHeader } from './styles';

const Header: React.FC<{ borderRadius?: string; type?: string; onClose?: () => any; conservationId: string }> = ({
  borderRadius,
  type,
  onClose,
  conservationId,
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const { currentConversation } = useAppSelector(chatSelector);

  return (
    <StyledHeader borderRadius={borderRadius}>
      <RecipientBox
        popup={type === 'popup' ? true : false}
        onClick={
          type === 'popup'
            ? () => {
                setIsShowDropdown(!isShowDropdown);
              }
            : undefined
        }
      >
        <Avatar
          src={
            currentConversation?.type === ConversationType.GROUP
              ? currentConversation?.avatar
              : currentConversation?.members[0]?.avatar
          }
        />
        <Box>
          <h3>
            {currentConversation?.type === ConversationType.GROUP
              ? `${currentConversation.members
                  .slice(0, 2)
                  .map((member: any) => member.username)
                  .join(', ')} ${
                  currentConversation.members.length - 2 > 0 ? `và ${currentConversation.members.length - 2} người khác` : ''
                }`
              : currentConversation?.members[0]?.username}
          </h3>
          <span>Hoạt Động 10 phút trước</span>
        </Box>
      </RecipientBox>

      {type === 'popup' ? (
        <StyledButtonIcon onClick={onClose}>
          <IoMdClose />
        </StyledButtonIcon>
      ) : (
        <>
          <StyledButtonIcon
            onClick={() => {
              setIsShowDropdown(!isShowDropdown);
            }}
          >
            <BsThreeDotsVertical />
          </StyledButtonIcon>
        </>
      )}
      {currentConversation?.type === ConversationType.GROUP && 'add member'}
      {isShowDropdown && (
        <ClickAwayListener
          onClickAway={() => {
            setIsShowDropdown(false);
          }}
        >
          <DropdownMenu
            top={type === 'popup' ? '0' : 'calc(100% + 0.6rem)'}
            right={type === 'popup' ? 'calc(100% + 0.6rem)' : '1.2rem'}
          >
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
    </StyledHeader>
  );
};

export default Header;
