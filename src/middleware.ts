import { Middleware } from '@reduxjs/toolkit';
import { logout } from 'features/authSlice';
import {
  addMember,
  createGroup,
  leaveGroup,
  receiveMessage,
  receiveSeenMessage,
  seenMessage,
  submitMessage,
  updateConversation,
} from 'features/chatSlice';
import { connectionEstablished, startConnecting, unConnect } from 'features/socketSlice';
import { ChatEvent, MessageItem, NotiType } from 'share/types';
import { io, Socket } from 'socket.io-client';
const END_POINT = 'wss://isekai-api.me';
export const chatMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().socket.isConnected;

    if (startConnecting.match(action)) {
      socket = io(END_POINT, {
        path: '/api/socket.io',
        query: {
          token: store.getState().auth.token.access_token,
        },
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('SOCKET CONNECTED');
        store.dispatch(connectionEstablished());
      });

      socket.on('connect-response', (data) => {
        if (data === 'jwt expired' || data === 'jwt malformed') {
          window.location.replace('/home');
        }
      });

      socket.on(ChatEvent.SEEN_MESSAGE, (data) => {
        store.dispatch(receiveSeenMessage(data));
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
      socket.on('notification', (res) => {
        console.log(res);
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

    if (seenMessage.match(action) && isConnectionEstablished) {
      socket.emit(ChatEvent.SEEN_MESSAGE, {
        conversationId: action.payload.conversationId,
        messageId: action.payload.messageId,
      });
    }

    if (unConnect.match(action)) {
      socket.disconnect();
    }

    if (logout.match(action)) {
      socket.disconnect();
    }

    next(action);
  };
};
