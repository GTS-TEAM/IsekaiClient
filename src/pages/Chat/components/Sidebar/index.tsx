import { Avatar, Box } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector, getAllConversations, selectConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { ButtonNewConversation, SidebarHeader, SidebarItem, SidebarMenu, StyledSidebar } from './styles';
const Sidebar: React.FC<{}> = () => {
  const { user: currentUser } = useAppSelector(authSelector);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { conversations } = useAppSelector(chatSelector);

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllConversations({ offset: 0, limit: 20 }));
  }, [dispatch]);

  return (
    <>
      <StyledSidebar>
        <SidebarHeader>
          <h1>Tin nhắn</h1>
          <ButtonNewConversation
            onClick={() => {
              setIsShowModal(true);
            }}
          >
            <AiOutlineUserAdd />
          </ButtonNewConversation>
        </SidebarHeader>
        <SidebarMenu>
          {conversations.map((conversation) => {
            const receiver = conversation.members.find((user) => user.id !== currentUser?.id);
            return (
              <SidebarItem
                key={conversation.id}
                onClick={() => {
                  navigate(`/message/${conversation.id}`);
                  dispatch(selectConversation(conversation));
                }}
              >
                <Avatar src={receiver?.avatar as string} />
                <Box>
                  <h3>{conversation.type === 'private' ? receiver?.username : 'Group'}</h3>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',

                      span: {
                        fontSize: '1.2rem',
                      },

                      'span:not(:last-child)::after': {
                        content: '"•"',
                        padding: '0 0.5rem',
                      },

                      'span:first-child': {
                        maxWidth: '19rem;',
                      },
                    }}
                  >
                    <span>{conversation.last_message}</span>
                    <span> {moment(conversation.updated_at, moment.defaultFormat).fromNow()}</span>
                  </Box>
                </Box>
              </SidebarItem>
            );
          })}
        </SidebarMenu>
      </StyledSidebar>
      <Modal onClose={closeModalHandler} isOpen={isShowModal} />
    </>
  );
};

export default Sidebar;
