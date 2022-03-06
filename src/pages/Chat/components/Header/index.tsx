import { Avatar, ClickAwayListener } from '@mui/material';
import { Box } from '@mui/system';
import { isekaiApi } from 'api/isekaiApi';
import ErrorAlert from 'components/ErrorAlert';
import ModalConfirm from 'components/ModalConfirm';
import { authSelector } from 'features/authSlice';
import { chatSelector, leaveGroup, removeConversation, updateConversation } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useMemo, useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiFileBlank, BiImageAdd } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdClose, IoMdLogOut } from 'react-icons/io';
import { MdOutlineColorLens, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConversationItem, ConversationType, User } from 'share/types';
import { convertNameConversation } from 'utils/convertNameConversation';
import { getReceiver } from 'utils/getReceiver';
import ModalAddMember from '../ModalAddMember';
import ModalChangeNameConversation from '../ModalChangeNameConversation';
import ModalChangeTheme from '../ModalChangeTheme';
import ModalEditNickName from '../ModalEditNickName';
import ModalViewFiles from '../ModalViewFiles';
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
  const [isShowModalAddMember, setIsShowModalAddMember] = useState<boolean>(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState<boolean>(false);
  const [isShowModalConfirmRemove, setIsShowModalConfirmRemove] = useState<boolean>(false);
  const [isShowModalEditNickName, setIsShowModalEditNickName] = useState<boolean>(false);
  const [isShowModalViewFiles, setIsShowModalViewFiles] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const { currentConversation } = useAppSelector(chatSelector);
  const { user: currentUser } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const receiver = useMemo(
    () => getReceiver(currentConversation as ConversationItem, currentUser as User),
    [currentConversation, currentUser],
  );

  return (
    <StyledHeader borderRadius={borderRadius}>
      <ErrorAlert
        isShow={isShowError}
        onClose={() => {
          setIsShowError(false);
        }}
      >
        File phải nhỏ hơn 5MB
      </ErrorAlert>
      <input
        type="file"
        accept="image/png,image/jpg,image/svg,image/jpeg"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (file.size >= 5 * 1024 * 1024) {
            setIsShowError(true);
            return;
          }
          const formData = new FormData();
          formData.append('files', file);
          const { data } = await isekaiApi.uploadImg(formData);
          dispatch(
            updateConversation({
              conversationId: currentConversation?.id as string,
              fields: {
                avatar: data.urls[0],
              },
            }),
          );
        }}
      />
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
        {currentConversation?.type === ConversationType.GROUP ? (
          <Avatar src={currentConversation?.avatar as string} alt={currentConversation?.name as string} />
        ) : (
          <Avatar src={receiver?.avatar} alt={receiver?.username.charAt(0).toUpperCase()} />
        )}

        <Box>
          <h3>{convertNameConversation(currentConversation as ConversationItem, currentUser as User)}</h3>
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
              {currentConversation?.type === ConversationType.GROUP && (
                <DropdownItem
                  onClick={() => {
                    setIsShowDropdown(false);
                    setIsShowModalAddMember(true);
                  }}
                >
                  <AiOutlineUsergroupAdd />
                  <Box>
                    <h3>Thêm</h3>
                    <span>Thêm thành viên vào nhóm</span>
                  </Box>
                </DropdownItem>
              )}
              <DropdownItem>
                <BiFileBlank />
                <Box>
                  <h3>Tệp</h3>
                  <span>Xem tất cả tệp bạn đã gởi</span>
                </Box>
              </DropdownItem>
              {currentConversation?.type === ConversationType.GROUP && (
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
              )}
              <DropdownItem
                onClick={() => {
                  setIsShowDropdown(false);
                  setIsShowModalEditNickName(true);
                }}
              >
                <AiOutlineEdit />
                <Box>
                  <h3>Chỉnh sửa biệt danh</h3>
                  <span>Chỉnh sửa biệt danh cho từng thành viên</span>
                </Box>
              </DropdownItem>
              {currentConversation?.type === ConversationType.GROUP && (
                <DropdownItem
                  onClick={() => {
                    setIsShowDropdown(false);
                    inputRef.current?.click();
                  }}
                >
                  <BiImageAdd />
                  <Box>
                    <h3>Avatar</h3>
                    <span>Thay đổi avatar của cuộc trò chuyện</span>
                  </Box>
                </DropdownItem>
              )}
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
              {currentConversation?.type === ConversationType.GROUP && (
                <DropdownItem
                  onClick={() => {
                    setIsShowDropdown(false);
                    setIsShowModalConfirm(true);
                  }}
                >
                  <IoMdLogOut />
                  <Box>
                    <h3>Out</h3>
                    <span>Rời khỏi nhóm chat</span>
                  </Box>
                </DropdownItem>
              )}
              <DropdownItem
                onClick={() => {
                  setIsShowDropdown(false);
                  setIsShowModalConfirmRemove(true);
                }}
              >
                <MdOutlineRemoveCircleOutline />
                <Box>
                  <h3>Xóa</h3>
                  <span>Xóa cuộc trò chuyện</span>
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
      <ModalAddMember
        isShow={isShowModalAddMember}
        onClose={() => {
          setIsShowModalAddMember(false);
        }}
      />
      <ModalConfirm
        header="Rời khỏi nhóm chat?"
        content="Bạn sẽ không nhận được tin nhắn từ cuộc trò chuyện này nữa và mọi người sẽ thấy bạn rời nhóm."
        onClose={() => {
          setIsShowModalConfirm(false);
        }}
        onConfirm={() => {
          dispatch(leaveGroup({ conversationId: currentConversation?.id as string }));
          navigate('/message', {
            replace: true,
          });
        }}
        isShow={isShowModalConfirm}
      />
      <ModalConfirm
        header="Xóa đoạn chat"
        content="Bạn không thể hoàn tác sau khi xóa cuộc trò chuyện này."
        onClose={() => {
          setIsShowModalConfirmRemove(false);
        }}
        onConfirm={() => {
          dispatch(removeConversation(currentConversation?.id as string));
          navigate('/message', {
            replace: true,
          });
        }}
        isShow={isShowModalConfirmRemove}
      />
      <ModalEditNickName
        isShow={isShowModalEditNickName}
        onClose={() => {
          setIsShowModalEditNickName(false);
        }}
      />
      <ModalViewFiles
        isShow={isShowModalViewFiles}
        onClose={() => {
          setIsShowModalViewFiles(false);
        }}
      />
    </StyledHeader>
  );
};

export default Header;