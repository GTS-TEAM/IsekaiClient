import { Avatar, Box, ClickAwayListener, IconButton } from '@mui/material';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { chatSelector, updateConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { Body, ListMember, MemberItem, StyledModal } from './styles';

const ModalEditNickName = () => {
  const { currentConversation } = useAppSelector(chatSelector);
  const [activeMemberEdit, setActiveMemberEdit] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  return (
    <ModalWrapper>
      <StyledModal>
        <Header>
          <h3>Chỉnh sử biệt danh</h3>
          <IconButton>
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
                      onClick={() => {
                        inputRef.current?.focus();
                        setActiveMemberEdit(member.id);
                      }}
                      style={{
                        backgroundColor: member.id === activeMemberEdit ? ' rgb(250, 250, 250)' : undefined,
                      }}
                    >
                      <Avatar src={member.user.avatar} alt={member.user.username} />
                      <ClickAwayListener
                        onClickAway={() => {
                          if (inputRef.current) {
                            // inputRef.current.value = '';
                          }
                        }}
                      >
                        <Box className="main-box">
                          {activeMemberEdit === member.id ? (
                            <input type="text" placeholder={member.nickname || member.user.username} ref={inputRef} />
                          ) : (
                            <Box className="sub-box">
                              <h5>{member.nickname || member.user.username}</h5>
                              <span>{member.nickname ? member.user.username : 'Đặt biệt danh'}</span>
                            </Box>
                          )}
                          {activeMemberEdit === member.id ? (
                            <IconButton
                              onClick={() => {
                                dispatch(
                                  updateConversation({
                                    conversationId: currentConversation.id,
                                    fields: {
                                      member: {
                                        id: member.id,
                                        nickname: inputRef.current?.value,
                                        role: member.role,
                                      },
                                    },
                                  }),
                                );
                              }}
                            >
                              <BsCheck2 />
                            </IconButton>
                          ) : (
                            <IconButton>
                              <AiOutlineEdit />
                            </IconButton>
                          )}
                        </Box>
                      </ClickAwayListener>
                    </MemberItem>
                  </li>
                );
              })}
          </ListMember>
        </Body>
      </StyledModal>
    </ModalWrapper>
  );
};

export default ModalEditNickName;
