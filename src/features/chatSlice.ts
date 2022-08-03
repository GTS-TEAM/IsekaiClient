import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { RootState } from 'store';
import { LIMITCHAT, LIMIT_CONVERSATION } from 'utils/constant';
import { v4 as uuid, v4 } from 'uuid';
import { ConversationItem, ISeen, Member, MemberFields, MessageItem } from './../share/types';

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

export const getAllMessageByReceiverId = createAsyncThunk<
  MessageItem[],
  {
    receiverId: string;
    offset: number;
  }
>('chat/getAllMessageByReceiverId', async ({ offset, receiverId }) => {
  const { data } = await isekaiApi.getAllMessageByReceiverId(receiverId, offset);
  return data;
});

export const getAllConversations = createAsyncThunk<
  any,
  {
    offset: number;
    limit: number;
  },
  {
    state: RootState;
  }
>('chat/getAllConversations', async ({ offset, limit }, thunkApi) => {
  const { data } = await isekaiApi.getAllConversation(limit, offset);
  return data;
});

export const removeConversation = createAsyncThunk('chat/removeConversation', async (conversationId: string) => {
  await isekaiApi.removeConversation(conversationId);
  return conversationId;
});

export const getConversation = createAsyncThunk<ConversationItem, string>('chat/getConversation', async (conversationId) => {
  const { data } = await isekaiApi.getConversationByConversationId(conversationId);
  return data;
});

const initialState: {
  messages: MessageItem[];
  isLoading: boolean;
  error: null | string | undefined;
  conversations: ConversationItem[];
  removedConversations: ConversationItem[];
  hasMoreMessage: boolean;
  hasMoreConversation: boolean;
  currentConversation: null | ConversationItem;
  popupChat: {
    receiverId: string;
    currentConversation: ConversationItem | null;
  };
} = {
  messages: [],
  conversations: [],
  removedConversations: [],
  currentConversation: null,
  hasMoreMessage: true,
  hasMoreConversation: true,
  isLoading: false,
  error: null,
  popupChat: {
    receiverId: '',
    currentConversation: null,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveMessage: (state, action: PayloadAction<MessageItem>) => {
      state.messages.unshift(action.payload);

      state.currentConversation = {
        ...action.payload.conversation,
        seen: action.payload.conversation.seen,
        last_message: {
          id: action.payload.id,
          content: action.payload.content,
          created_at: action.payload.updated_at,
          sender: action.payload.sender,
          type: action.payload.type,
          updated_at: action.payload.created_at,
        },
      };

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
          seen: action.payload.conversation.seen,
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
          seen: [],
          unread_message_count: action.payload.conversation.unread_message_count,
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
      state.hasMoreMessage = false;
    },
    selectConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    selectPopupChat: (state, action) => {
      state.popupChat = action.payload;
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
    ) => {
      return;
    },
    unmountChat: (state) => {
      state.conversations = [];
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
      state.currentConversation = null;
    },
    exitChatView: (state) => {
      state.currentConversation = null;
    },
    seenMessage: (state, action) => {
      return;
    },
    receiveSeenMessage: (state, action) => {
      const indexMessageSeen = state.currentConversation?.seen.findIndex(
        (_seen) => _seen.user.id === action.payload.user.id,
      ) as number; // cai tn maf tk user da seen tn trong currencovnersation
      if (state.currentConversation?.seen[indexMessageSeen]) {
        //  neu ma tk user do seen roi thi cap nhat lai cai id cua cai mess de render ra dung vi tri mess cua tk user do vua seen :)
        state.currentConversation.seen[indexMessageSeen] = {
          messageId: action.payload.message.id,
          id: v4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: action.payload.user,
        };
      } else {
        // khong thi them no vao :0
        if (state.currentConversation?.seen) {
          const newSeenMessage: ISeen = {
            messageId: action.payload.message.id,
            id: v4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user: action.payload.user,
          };
          state.currentConversation.seen = [...state.currentConversation.seen, newSeenMessage];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessage.fulfilled, (state, action: PayloadAction<MessageItem[]>) => {
        if (action.payload.length >= LIMITCHAT) {
          state.hasMoreMessage = true;
        } else {
          state.hasMoreMessage = false;
        }
        state.messages = [...state.messages, ...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getAllMessageByReceiverId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessageByReceiverId.fulfilled, (state, action: PayloadAction<MessageItem[]>) => {
        if (action.payload.length >= LIMITCHAT) {
          state.hasMoreMessage = true;
        } else {
          state.hasMoreMessage = false;
        }
        state.messages = [...state.messages, ...action.payload];
        state.isLoading = false;
      })
      .addCase(getAllMessageByReceiverId.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getAllConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllConversations.fulfilled, (state, action: PayloadAction<ConversationItem[]>) => {
        if (action.payload.length >= LIMIT_CONVERSATION) {
          state.hasMoreConversation = true;
        } else {
          state.hasMoreConversation = false;
        }

        state.conversations = [...state.conversations, ...action.payload];
        state.isLoading = false;
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
        state.currentConversation = null;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.currentConversation = action.payload;
      });
  },
});

export const {
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
  selectPopupChat,
  seenMessage,
  receiveSeenMessage,
} = chatSlice.actions;

export const chatSelector = (state: RootState) => state.chat;

export default chatSlice.reducer;
