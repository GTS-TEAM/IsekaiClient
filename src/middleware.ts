import { Middleware } from '@reduxjs/toolkit';
import {
  addMember,
  connectionEstablished,
  createGroup,
  leaveGroup,
  receiveMessage,
  startConnecting,
  submitMessage,
  unmountChat,
  updateConversation,
} from 'features/chatSlice';
import { ChatEvent, MessageItem } from 'share/types';
import { io, Socket } from 'socket.io-client';
const END_POINT = 'wss://isekai-api.me';
export const chatMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;

    if (startConnecting.match(action)) {
      socket = io(END_POINT, {
        path: '/api/socket.io',
        query: {
          token: store.getState().auth.token.access_token,
        },
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        store.dispatch(connectionEstablished());
      });

      socket.on('connect-response', (data) => {
        if (data === 'jwt expired' || data === 'jwt malformed') {
          window.location.replace('/home');
        }
      });

      socket.on('error', (data) => {
        console.log(data);
      });

      socket.on(ChatEvent.MESSAGE, (message: MessageItem) => {
        if (!message) {
          return;
        }
        store.dispatch(receiveMessage(message));
      });
    }
    if (submitMessage.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.MESSAGE, { ...action.payload });
    }

    if (createGroup.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.CREATEGROUP, action.payload);
    }

    if (updateConversation.match(action) && isConnectionEstablished) {
      socket.emit('update-conversation', {
        conversationId: action.payload.conversationId,
        fields: {
          ...action.payload.fields,
        },
      });
    }

    if (addMember.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.ADDMEMBER, {
        membersId: action.payload.membersId,
        conversationId: action.payload.conversationId,
      });
    }

    if (leaveGroup.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.LEAVEGROUP, {
        conversationId: action.payload.conversationId,
      });
    }

    if (unmountChat.match(action)) {
      socket.disconnect();
    }

    next(action);
  };
};
