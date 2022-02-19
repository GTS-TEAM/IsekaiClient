import { Box } from '@mui/material';
import Layout from 'components/Layout/Layout';
import React from 'react';
import ChatMain from './components/ChatMain/ChatMain';
import Header from './components/Header/Header';
import TypeMessage from './components/TypeMessage/TypeMessage';
import { ChatBody, StyledChat } from './styles';

const Chat = () => {
  return (
    <Layout>
      <StyledChat className="layout">
        <ChatBody>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
