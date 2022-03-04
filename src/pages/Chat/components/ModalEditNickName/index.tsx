import { Avatar, Box, ClickAwayListener, IconButton } from '@mui/material';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { chatSelector, updateConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { Body, ListMember, MemberItem, StyledModal } from './styles';

const ModalEditNickName: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ isShow, onClose }) => {
  const { currentConversation } = useAppSelector(chatSelector);
  const [activeMemberEdit, setActiveMemberEdit] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setActiveMemberEdit('');
      setTextInput('');
    };
  }, []);

  return isShow ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal>
          <Header>
            <h3>Chỉnh sử biệt danh</h3>
            <IconButton onClick={onClose}>
              <GrFormClose />
            </IconButton>
          </Header>
          <Body>
            <ListMember>
              {currentConversation &&
                currentConversation.members?.map((member) => {
                  return (
                    <li key={member.id}>
                      <MemberItem
                        style={{
                          backgroundColor: member.id === activeMemberEdit ? ' rgb(250, 250, 250)' : undefined,
                        }}
                      >
                        <Avatar src={member.user.avatar} alt={member.user.username} />
                        <Box
                          className="main-box"
                          onClick={() => {
                            inputRef.current?.focus();
                            setActiveMemberEdit(member.id);
                          }}
                        >
                          {activeMemberEdit === member.id ? (
                            <div className="input-field">
                              <input
                                type="text"
                                placeholder={member.nickname || member.user.username}
                                ref={inputRef}
                                value={textInput}
                                onChange={(e) => {
                                  setTextInput(e.target.value);
                                }}
                                autoFocus
                              />
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMemberEdit('');
                                  setTextInput('');
                                  inputRef.current?.blur();
                                }}
                              >
                                <IoCloseOutline />
                              </IconButton>
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(
                                    updateConversation({
                                      conversationId: currentConversation.id,
                                      fields: {
                                        member: {
                                          id: member.id,
                                          nickname: textInput.trim().length > 0 ? textInput : member.user.username,
                                          role: member.role,
                                        },
                                      },
                                    }),
                                  );
                                  setActiveMemberEdit('');
                                  setTextInput('');
                                  inputRef.current?.blur();
                                }}
                              >
                                <BsCheck2 />
                              </IconButton>
                            </div>
                          ) : (
                            <>
                              <Box className="sub-box">
                                <h5>{member.nickname || member.user.username}</h5>
                                <span>
                                  {member.nickname !== member.user.username ? member.user.username : 'Đặt biệt danh'}
                                </span>
                              </Box>
                              <IconButton
                                onClick={() => {
                                  inputRef.current?.focus();
                                  setActiveMemberEdit(member.id);
                                }}
                              >
                                <AiOutlineEdit />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </MemberItem>
                    </li>
                  );
                })}
            </ListMember>
          </Body>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default ModalEditNickName;
