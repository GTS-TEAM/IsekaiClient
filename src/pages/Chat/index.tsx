import { Box } from '@mui/material';
import Layout from 'components/Layout/Layout';
import React from 'react';
import ChatMain from './components/ChatMain';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TypeMessage from './components/TypeMessage';
import { ChatBody, StyledChat } from './styles';

const Chat = () => {
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
