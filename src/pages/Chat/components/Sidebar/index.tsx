import { Avatar, Box } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector, getAllConversations, selectConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageType, User } from 'share/types';
import { convertNameConversation } from 'utils/convertNameConversation';
import { getReceiver } from 'utils/getReceiver';
import Modal from '../ModalCreateConversation';
import { ButtonNewConversation, SidebarHeader, SidebarItem, SidebarMenu, StyledSidebar } from './styles';
const Sidebar: React.FC<{}> = () => {
  const { user: currentUser } = useAppSelector(authSelector);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { conversations } = useAppSelector(chatSelector);
  const { id } = useParams();

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
            const receiver = getReceiver(conversation, currentUser as User);
            // const last_message= conversation.last_message?.type===MessageType.GIF?
            return (
              <SidebarItem
                key={conversation.id}
                onClick={() => {
                  navigate(`/message/${conversation.id}`);
                  dispatch(selectConversation(conversation));
                }}
                style={{
                  backgroundColor: (id as string) === conversation.id ? 'red' : undefined,
                }}
              >
                <Avatar src={receiver?.avatar as string} />
                <Box>
                  <h3>{convertNameConversation(conversation, currentUser as User)}</h3>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--fds-gray-3)',

                      span: {
                        fontSize: '1.2rem',
                      },

                      div: {
                        width: '0.4rem',
                        height: '0.4rem',
                        backgroundColor: 'var(--fds-gray-3)',
                        borderRadius: '50%',
                        margin: '0 0.5rem',
                        flexShrink: '0',
                      },

                      'span:first-of-type': {
                        maxWidth: '19rem;',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        '  lineClamp': '1',
                        ' -webkit-box-orient': 'vertical',
                      },
                      'span:last-of-type': {
                        flexShrink: '0',
                      },
                    }}
                  >
                    {conversation.last_message && (
                      <>
                        <span>
                          {conversation.last_message?.type === MessageType.GIF
                            ? `${
                                conversation.last_message.sender?.nickname || conversation.last_message.sender?.user.avatar
                              } đã gởi 1 tệp Gif`
                            : conversation.last_message?.type === MessageType.AUDIO
                            ? `${
                                conversation.last_message.sender?.nickname || conversation.last_message.sender?.user.avatar
                              } đã gởi 1 tệp Audio`
                            : conversation.last_message?.type === MessageType.FILE
                            ? `${
                                conversation.last_message.sender?.nickname || conversation.last_message.sender?.user.avatar
                              } đã gởi 1 File`
                            : conversation.last_message?.type === MessageType.IMAGE
                            ? `${
                                conversation.last_message.sender?.nickname || conversation.last_message.sender?.user.avatar
                              } đã gởi 1 hình ảnh`
                            : conversation.last_message?.type === MessageType.TEXT
                            ? `${
                                conversation.last_message.sender?.nickname || conversation.last_message.sender?.user.username
                              }: ${conversation.last_message.content}`
                            : conversation.last_message.content}
                        </span>
                        <div></div>
                        <span> {moment(conversation.last_message?.updated_at, moment.defaultFormat).fromNow()}</span>
                      </>
                    )}
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
