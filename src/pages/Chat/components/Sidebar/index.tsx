import { Avatar, Box } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector, getAllConversations, selectConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { ConversationType, FileType, MessageType, User } from 'share/types';
import { LIMIT_CONVERSATION } from 'utils/constant';
import { getReceiver } from 'utils/getReceiver';
import ModalCreateCovnersation from '../ModalChooseUser/ModalCreateCovnersation';
import { ButtonNewConversation, SidebarHeader, SidebarItem, SidebarMenu, StyledSidebar } from './styles';
const Sidebar: React.FC<{
  style?: React.CSSProperties;
}> = ({ style }) => {
  const { user: currentUser } = useAppSelector(authSelector);
  const { conversations, hasMoreConversation } = useAppSelector(chatSelector);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const closeModalHandler = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    dispatch(getAllConversations({ offset: 0, limit: LIMIT_CONVERSATION }));
  }, [dispatch]);

  console.log('Conversations', conversations);

  return (
    <>
      <StyledSidebar style={style}>
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
        <SidebarMenu
          dataLength={conversations.length}
          height={'calc(100vh - 2 * var(--headerHeight)) '}
          next={async () => {
            setOffset(offset + LIMIT_CONVERSATION);
            dispatch(getAllConversations({ offset: offset + LIMIT_CONVERSATION, limit: LIMIT_CONVERSATION }));
          }}
          hasMore={hasMoreConversation}
          loader={<p>Loading...</p>}
        >
          {conversations.map((conversation) => {
            const receiver = getReceiver(conversation, currentUser as User);
            const nameSender =
              conversation.last_message?.sender?.user.username === currentUser?.username
                ? 'Bạn'
                : conversation.last_message?.sender?.nickname || conversation.last_message?.sender?.user.username;
            return (
              <SidebarItem
                key={conversation.id}
                onClick={() => {
                  navigate(`/message/${conversation.id}`);
                  dispatch(selectConversation(conversation));
                }}
                style={{ backgroundColor: id === conversation.id ? '#fafafa' : undefined }}
              >
                {conversation.type === ConversationType.GROUP ? (
                  <Avatar src={conversation.avatar as string} alt={conversation.name as string} />
                ) : (
                  <Avatar src={receiver?.user.avatar} alt={receiver?.user.username.charAt(0).toUpperCase()} />
                )}
                <Box>
                  <h3>{conversation.name || receiver?.nickname || receiver?.user.username}</h3>
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
                            ? `${nameSender} đã gởi 1 tệp Gif`
                            : conversation.last_message?.type === FileType.AUDIO
                            ? `${nameSender} đã gởi 1 tệp Audio`
                            : conversation.last_message?.type === FileType.FILE
                            ? `${nameSender} đã gởi 1 File`
                            : conversation.last_message?.type === FileType.IMAGE
                            ? `${nameSender} đã gởi 1 hình ảnh`
                            : conversation.last_message?.type === FileType.VIDEO
                            ? `${nameSender} đã gởi 1 video`
                            : conversation.last_message?.type === MessageType.TEXT
                            ? `${nameSender}: ${conversation.last_message.content}`
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
      {isShowModal && <ModalCreateCovnersation onClose={closeModalHandler} />}
    </>
  );
};

export default React.memo(Sidebar);
