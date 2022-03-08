import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { RootState } from 'store';
import { LIMITCHAT } from 'utils/constant';
import { v4 as uuid } from 'uuid';
import { ConversationItem, Member, MemberFields, MessageItem } from './../share/types';

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
    conversationId: string;
  },
  {
    state: RootState;
  }
>('chat/getAllConversations', async ({ offset, limit, conversationId }, thunkApi) => {
  const { data } = await isekaiApi.getAllConversation(limit, offset);

  const conversationExist = data.find((item: any) => item.id === conversationId);
  if (conversationExist) {
    thunkApi.dispatch(selectConversation(conversationExist));
  } else {
    if (data.length > 0) {
      // thunkApi.dispatch(selectConversation(data[0]));
    }
  }
  return data;
});

export const removeConversation = createAsyncThunk('chat/removeConversation', async (conversationId: string) => {
  await isekaiApi.removeConversation(conversationId);
  return conversationId;
});

const initialState: {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  messages: MessageItem[];
  isLoading: boolean;
  error: null | string | undefined;
  conversations: ConversationItem[];
  removedConversations: ConversationItem[];
  hasMore: boolean;
  currentConversation: null | ConversationItem;
} = {
  isEstablishingConnection: false,
  isConnected: false,
  messages: [],
  conversations: [],
  removedConversations: [],
  currentConversation: null,
  hasMore: true,
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
      state.messages.unshift(action.payload);
      state.currentConversation = action.payload.conversation;
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
          avatar: action.payload.conversation.avatar,
        };
      } else {
        state.conversations.push({
          updated_at: action.payload.updated_at,
          created_at: action.payload.created_at,
          avatar: null,
          name: null,
          members: action.payload.conversation.members,
          id: action.payload.conversation.id,
          type: action.payload.conversation.type,
          last_message: {
            content: action.payload.content,
            created_at: action.payload.created_at,
            updated_at: action.payload.updated_at,
            id: uuid(),
            type: action.payload.type,
            sender: action.payload.sender,
          },
          theme: action.payload.conversation.theme,
        });
      }

      state.conversations.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    },
    submitMessage: (
      state,
      action: PayloadAction<{
        message?: string;
        receiverId?: string;
        conversationId?: string;
        type?: string;
        files?: {
          link: string;
          name: string;
          type: string;
        }[];
      }>,
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
          member?: MemberFields;
        };
      }>,
    ) => {},
    unmountChat: (state) => {
      state.conversations = [];
      state.currentConversation = null;
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.messages = [];
    },
    addMember: (state, action: PayloadAction<{ membersId: string[]; conversationId: string; members: Member[] }>) => {
      const indexConversationExist = state.conversations.findIndex(
        (conversation) => conversation.id === action.payload.conversationId,
      );
      if (state.conversations[indexConversationExist]) {
        state.conversations[indexConversationExist] = {
          ...state.conversations[indexConversationExist],
          members: state.conversations[indexConversationExist].members?.concat(action.payload.members),
        };
      }

      // @ts-ignore
      state.currentConversation = {
        ...state.currentConversation,
        // @ts-ignore
        members: state.currentConversation?.members?.concat(action.payload.members),
      };
    },
    leaveGroup: (
      state,
      action: PayloadAction<{
        conversationId: string;
      }>,
    ) => {
      state.conversations = state.conversations.filter((conversation) => conversation.id !== action.payload.conversationId);
    },
    exitChatView: (state) => {
      state.currentConversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessage.fulfilled, (state, action: PayloadAction<MessageItem[]>) => {
        if (action.payload.length >= LIMITCHAT) {
          state.hasMore = true;
        } else {
          state.hasMore = false;
        }
        state.messages = [...state.messages, ...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getAllConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConversations.fulfilled, (state, action: PayloadAction<ConversationItem[]>) => {
        state.conversations = action.payload;
      })
      .addCase(removeConversation.fulfilled, (state, action) => {
        const removedConversation = state.conversations.find((conversation) => conversation.id === action.payload);
        if (removedConversation) {
          state.removedConversations.push({
            ...removedConversation,
            last_message: null,
          });
        }
        state.conversations = state.conversations.filter((conversation) => conversation.id !== action.payload);
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
  addMember,
  leaveGroup,
  exitChatView,
} = chatSlice.actions;

export const chatSelector = (state: RootState) => state.chat;

export default chatSlice.reducer;
