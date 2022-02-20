import { Box } from '@mui/material';
import Layout from 'components/Layout/Layout';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatMain from './components/ChatMain';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TypeMessage from './components/TypeMessage';
import { ChatBody, StyledChat } from './styles';

const END_POINT = 'wss://isekai-api.me/api/socket.io';

const Chat = () => {
  const { token } = useAppSelector(authSelector);
  useEffect(() => {
    const socket = io(END_POINT, {
      query: {
        token: token.access_token,
      },
      transports: ['websocket'],
    });
  }, [token]);
  return (
    <Layout>
      <StyledChat className="layout">
        <ChatBody>
          <Sidebar />
          <Box>
            <Header />
            <ChatMain />
            <TypeMessage />
          </Box>
        </ChatBody>
      </StyledChat>
    </Layout>
  );
};

export default Chat;
