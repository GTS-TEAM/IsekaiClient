import { createAsyncThunk, createSlice, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { ChatEvent, ConversationItem, MessageItem } from 'share/types';
import { io, Socket } from 'socket.io-client';
import { RootState } from 'store';

const END_POINT = 'wss://isekai-api.me';

export const getAllMessage = createAsyncThunk<
  MessageItem[],
  {
    conversation_id: string;
    offset: number;
  }
>('chat/getAllMessage', async ({ conversation_id, offset }) => {
  const { data } = await isekaiApi.getAllMessage(conversation_id, offset);
  return data;
});

export const getAllConversations = createAsyncThunk<
  any,
  {
    offset: number;
    limit: number;
  }
>('chat/getAllConversations', async ({ offset, limit }) => {
  const { data } = await isekaiApi.getAllConversation(limit, offset);
  return data;
});

const initialState: {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  messages: MessageItem[];
  isLoading: boolean;
  error: null | string | undefined;
  conversations: ConversationItem[];
  hasMore: boolean;
  currentConversation: null | any;
} = {
  isEstablishingConnection: false,
  isConnected: false,
  messages: [],
  conversations: [],
  currentConversation: null,
  hasMore: false,
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveMessage: (state, action: PayloadAction<MessageItem>) => {
      const newConversation = {
        ...action.payload.conversation,
        members: state.currentConversation.members,
      };
      state.messages.unshift({
        ...action.payload,
        conversation: {
          ...newConversation,
        },
      });

      state.currentConversation = newConversation;

      const conversationExistIndex = state.conversations.findIndex(
        (conversation) => conversation.id === action.payload.conversation.id,
      );

      if (state.conversations[conversationExistIndex]) {
        state.conversations[conversationExistIndex] = {
          ...state.conversations[conversationExistIndex],
          updated_at: action.payload.updated_at,
          last_message: {
            content: action.payload.content,
            updated_at: action.payload.updated_at,
            created_at: action.payload.created_at,
            id: action.payload.id,
            type: action.payload.type,
            sender: action.payload.sender,
          },
          theme: action.payload.conversation.theme,
          name: action.payload.conversation.name,
        };
      } else {
        state.conversations.push({
          updated_at: action.payload.updated_at,
          created_at: action.payload.created_at,
          avatar: null,
          name: null,
          members: action.payload.conversation.members || state.currentConversation?.members,
          id: action.payload.conversation.id,
          type: action.payload.conversation.type,
          last_message: action.payload.conversation.last_message,
          theme: action.payload.conversation.theme,
        });
      }

      state.conversations.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
      console.log(action.payload);
    },
    submitMessage: (
      state,
      action: PayloadAction<{ message: string; receiverId?: string; conversationId?: string; type?: string }>,
    ) => {
      return;
    },
    createGroup: (state, action: PayloadAction<string[]>) => {
      return;
    },
    addConversation: (state, action: PayloadAction<ConversationItem>) => {
      const conversationExistIndex = state.conversations.findIndex((conversation) => conversation.id === action.payload.id);
      if (!state.conversations[conversationExistIndex]) {
        state.conversations.unshift(action.payload);
      }
    },
    unmountMessage: (state) => {
      state.messages = [];
      state.hasMore = false;
    },
    selectConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    updateConversation: (
      state,
      action: PayloadAction<{
        conversationId: string;
        fields: {
          name?: string;
          avatar?: string;
          theme?: string;
        };
      }>,
    ) => {
      console.log(action.payload);
    },
    unmountChat: (state) => {
      state.conversations = [];
      state.currentConversation = null;
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessage.fulfilled, (state, action: PayloadAction<MessageItem[]>) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
        state.messages = [...state.messages, ...action.payload];
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConversations.fulfilled, (state, action: PayloadAction<ConversationItem[]>) => {
        state.conversations = action.payload;
        state.currentConversation = action.payload[0];
      });
  },
});

export const {
  connectionEstablished,
  startConnecting,
  submitMessage,
  receiveMessage,
  unmountMessage,
  createGroup,
  selectConversation,
  addConversation,
  updateConversation,
  unmountChat,
} = chatSlice.actions;
export const chatSelector = (state: RootState) => state.chat;

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

      socket.on(ChatEvent.MESSAGE, (message: MessageItem) => {
        store.dispatch(receiveMessage(message as MessageItem));
        selectConversation(message.conversation);
        window.history.replaceState(null, '', `/message/${message.conversation.id}`);
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

    if (unmountChat.match(action)) {
      socket.emit('disconnect', function () {
        console.log('disconnect client event....');
      });
    }

    next(action);
  };
};

export default chatSlice.reducer;
