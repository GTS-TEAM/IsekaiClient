import { Box } from '@mui/material';
import Layout from 'components/Layout/Layout';
import { startConnecting, unmountChat } from 'features/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';
import { ChatBody, StyledChat } from './styles';

// const END_POINT = 'wss://isekai-api.me';

// const socket = io(END_POINT, {
//   path: '/api/socket.io',
//   query: {
//     token: getTokenFromLocalStorage().access_token,
//   },
//   transports: ['websocket'],
// });

const Chat = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(startConnecting());

    return () => {
      dispatch(unmountChat());
    };
  }, [dispatch]);

  return (
    <Layout>
      <StyledChat className="layout">
        <ChatBody>
          <Sidebar />
          <Box
            sx={{
              justifyContent: 'center',

              '& > p': {
                fontSize: '2.4rem',
                color: 'var(--fds-gray-7)',
                textAlign: 'center',
                padding: '0 1.2rem',
              },
            }}
          >
            {id ? <ChatView /> : <p>Chọn cuộc trò chuyện.</p>}
          </Box>
        </ChatBody>
      </StyledChat>
    </Layout>
  );
};

export default Chat;