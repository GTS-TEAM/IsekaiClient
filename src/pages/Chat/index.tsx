import { Box } from '@mui/material';
import Layout from 'components/Layout/Layout';
import { chatSelector, getConversation, unmountChat } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useWindowSize } from 'hooks/useWindowSize';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { ChatBody, StyledChat } from './styles';

const Chat = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { windowWidth } = useWindowSize();
  const navigate = useNavigate();
  const { currentConversation } = useAppSelector(chatSelector);
  const responsive = useMemo(() => {
    if (windowWidth < 768 && currentConversation) {
      return {
        displayChatView: 'flex !important',
        displaySidebar: 'none !important',
        width: '100%',
      };
    } else if (windowWidth < 768 && !currentConversation) {
      return {
        displayChatView: 'none !important',
        displaySidebar: 'flex !important',
        width: '100%',
      };
    }

    return {
      display: 'flex !important',
      displaySidebar: 'flex !important',
      width: '32rem',
    };
  }, [windowWidth, currentConversation]);

  useEffect(() => {
    if (id && !currentConversation) {
      dispatch(getConversation(id as string));
    }
  }, [id, dispatch, currentConversation]);

  useEffect(() => {
    if (currentConversation) {
      navigate(`/message/${currentConversation.id}`);
    }
  }, [currentConversation, navigate]);

  useEffect(() => {
    return () => {
      dispatch(unmountChat());
    };
  }, [dispatch]);

  return (
    <StyledChat className="layout">
      <ChatBody>
        <Box
          sx={{
            display: responsive.displaySidebar,
            width: responsive.width,
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            justifyContent: 'center',
            display: responsive.displayChatView,
          }}
        >
          {id ? <ChatView /> : <p>Chọn cuộc trò chuyện.</p>}
        </Box>
      </ChatBody>
    </StyledChat>
  );
};

export default Chat;
