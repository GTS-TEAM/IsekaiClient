import { Avatar, ClickAwayListener } from '@mui/material';
import { Box } from '@mui/system';
import { authSelector } from 'features/authSlice';
import { chatSelector } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BiFileBlank } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineColorLens, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { ConversationType, User } from 'share/types';
import { convertNameConversation } from 'utils/convertNameConversation';
import { getReceiver } from 'utils/getReceiver';
import ModalChangeNameConversation from '../ModalChangeNameConversation';
import ModalChangeTheme from '../ModalChangeTheme';
import { RecipientBox, StyledButtonIcon, StyledHeader } from './styles';

const Header: React.FC<{ borderRadius?: string; type?: string; onClose?: () => any; conservationId: string }> = ({
  borderRadius,
  type,
  onClose,
  conservationId,
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [isShowModalChangeTheme, setIsShowModalChangeTheme] = useState<boolean>(false);
  const [isShowModalChangeName, setIsShowModalChangeName] = useState<boolean>(false);
  const { currentConversation } = useAppSelector(chatSelector);
  const { user: currentUser } = useAppSelector(authSelector);

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
              : getReceiver(currentConversation, currentUser as User)?.avatar
          }
        />
        <Box>
          <h3>{convertNameConversation(currentConversation, currentUser as User)}</h3>
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
              <DropdownItem
                onClick={() => {
                  setIsShowDropdown(false);
                  setIsShowModalChangeName(true);
                }}
              >
                <AiOutlineEdit />
                <Box>
                  <h3>Chỉnh sửa</h3>
                  <span>Chỉnh sửa tên cuộc trò chyện</span>
                </Box>
              </DropdownItem>
              <DropdownItem>
                <MdOutlineRemoveCircleOutline />
                <Box>
                  <h3>Xóa</h3>
                  <span>Xóa cuộc trò chuyện</span>
                </Box>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setIsShowDropdown(false);
                  setIsShowModalChangeTheme(true);
                }}
              >
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
      <ModalChangeTheme
        onClose={() => {
          setIsShowModalChangeTheme(false);
        }}
        isShow={isShowModalChangeTheme}
      />
      <ModalChangeNameConversation
        isShow={isShowModalChangeName}
        onClose={() => {
          setIsShowModalChangeName(false);
        }}
      />
    </StyledHeader>
  );
};

export default Header;
