import { Avatar, ClickAwayListener } from '@mui/material';
import { Box } from '@mui/system';
import { isekaiApi } from 'api/isekaiApi';
import ErrorAlert from 'components/ErrorAlert';
import ModalConfirm from 'components/Modal/ModalConfirm';
import { authSelector } from 'features/authSlice';
import { exitChatView, leaveGroup, removeConversation, updateConversation } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiFileBlank, BiImageAdd } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosArrowBack, IoMdClose, IoMdLogOut } from 'react-icons/io';
import { MdOutlineColorLens, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ConversationItem, ConversationType, User } from 'share/types';
import { getReceiver } from 'utils/getReceiver';
import ModalChangeNameConversation from '../ModalChangeNameConversation';
import ModalChangeTheme from '../ModalChangeTheme';
import ModalChooseUser from '../ModalChooseUser/ModalChooseUser';
import ModalEditNickName from '../ModalEditNickName';
import ModalViewFiles from '../ModalViewFiles';
import { RecipientBox, StyledBadge, StyledButtonIcon, StyledHeader } from './styles';

const Header: React.FC<{
  borderRadius?: string;
  type?: 'popup' | 'screen';
  onClose?: () => any;
  currentConversation: ConversationItem;
  theme: string;
}> = ({ borderRadius, type, onClose, currentConversation, theme }) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [isShowModalChangeTheme, setIsShowModalChangeTheme] = useState<boolean>(false);
  const [isShowModalChangeName, setIsShowModalChangeName] = useState<boolean>(false);
  const [isShowModalAddMember, setIsShowModalAddMember] = useState<boolean>(false);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState<boolean>(false);
  const [isShowModalConfirmRemove, setIsShowModalConfirmRemove] = useState<boolean>(false);
  const [isShowModalEditNickName, setIsShowModalEditNickName] = useState<boolean>(false);
  const [isShowModalViewFiles, setIsShowModalViewFiles] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const { user: currentUser } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const receiver = getReceiver(currentConversation as ConversationItem, currentUser as User);

  return (
    <StyledHeader borderRadius={borderRadius}>
      <ErrorAlert
        isShow={isShowError}
        onClose={() => {
          setIsShowError(false);
        }}
      >
        File ph???i nh??? h??n 5MB
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
        {type !== 'popup' && (
          <button
            onClick={() => {
              dispatch(exitChatView());
              navigate('/message', {
                replace: true,
              });
            }}
          >
            <IoIosArrowBack />
          </button>
        )}
        {currentConversation?.type === ConversationType.GROUP ? (
          <Avatar src={currentConversation?.avatar as string} alt={currentConversation?.name as string} />
        ) : (
          <div>
            {!receiver?.user.last_activity ? (
              <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                <Avatar src={receiver?.user?.avatar} alt={receiver?.user?.username.charAt(0).toUpperCase()} />
              </StyledBadge>
            ) : (
              <Avatar src={receiver?.user?.avatar} alt={receiver?.user?.username.charAt(0).toUpperCase()} />
            )}
          </div>
        )}
        <Box>
          <h3>{currentConversation?.name || receiver?.nickname || receiver?.user.username}</h3>
          {receiver?.user.last_activity === null ? (
            <span>??ang ho???t ?????ng</span>
          ) : (
            <span>Ho???t ?????ng {moment(receiver?.user.last_activity, moment.defaultFormat).fromNow()}</span>
          )}
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
                    <h3>Th??m</h3>
                    <span>Th??m th??nh vi??n v??o nh??m</span>
                  </Box>
                </DropdownItem>
              )}
              <DropdownItem
                onClick={() => {
                  setIsShowDropdown(false);
                  setIsShowModalViewFiles(true);
                }}
              >
                <BiFileBlank />
                <Box>
                  <h3>T???p</h3>
                  <span>Xem t???t c??? t???p b???n ???? g???i</span>
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
                    <h3>Ch???nh s???a</h3>
                    <span>Ch???nh s???a t??n cu???c tr?? chy???n</span>
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
                  <h3>Ch???nh s???a bi???t danh</h3>
                  <span>Ch???nh s???a bi???t danh cho t???ng th??nh vi??n</span>
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
                    <span>Thay ?????i avatar c???a cu???c tr?? chuy???n</span>
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
                  <h3>T??y ch???nh</h3>
                  <span>Thay ?????i m??u c???a cu???c tr?? chuy???n</span>
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
                    <span>R???i kh???i nh??m chat</span>
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
                  <h3>X??a</h3>
                  <span>X??a cu???c tr?? chuy???n</span>
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
        currentConversation={currentConversation}
      />
      <ModalChangeNameConversation
        isShow={isShowModalChangeName}
        onClose={() => {
          setIsShowModalChangeName(false);
        }}
        currentConversation={currentConversation}
      />
      {isShowModalAddMember && (
        <ModalChooseUser
          onClose={() => {
            setIsShowModalAddMember(false);
          }}
          currentConversation={currentConversation}
        />
      )}
      <ModalConfirm
        header="R???i kh???i nh??m chat?"
        content="B???n s??? kh??ng nh???n ???????c tin nh???n t??? cu???c tr?? chuy???n n??y n???a v?? m???i ng?????i s??? th???y b???n r???i nh??m."
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
        theme={currentConversation?.theme as string}
      />
      <ModalConfirm
        header="X??a ??o???n chat"
        content="B???n kh??ng th??? ho??n t??c sau khi x??a cu???c tr?? chuy???n n??y."
        onClose={() => {
          setIsShowModalConfirmRemove(false);
        }}
        onConfirm={async () => {
          const action = await dispatch(removeConversation(currentConversation?.id as string));

          if (removeConversation.fulfilled.match(action)) {
            navigate('/message', {
              replace: true,
            });
          }
        }}
        isShow={isShowModalConfirmRemove}
      />
      {isShowModalEditNickName && (
        <ModalEditNickName
          onClose={() => {
            setIsShowModalEditNickName(false);
          }}
          currentConversation={currentConversation}
        />
      )}
      {isShowModalViewFiles && (
        <ModalViewFiles
          onClose={() => {
            setIsShowModalViewFiles(false);
          }}
          currentConversation={currentConversation}
        />
      )}
    </StyledHeader>
  );
};

export default Header;
