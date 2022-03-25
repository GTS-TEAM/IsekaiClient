import { CircularProgress } from '@mui/material';
import { chatSelector, getAllMessage, getAllMessageByReceiverId, unmountMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ConversationItem, MessageItem } from 'share/types';
import { LIMITCHAT } from 'utils/constant';
import Message from '../Message';
import { StyledChatMain } from './styles';

const ChatMain: FC<{
  heightChatMain?: string;
  maxWidthMessage?: string;
  conversationId: string;
  type?: 'popup' | 'screen';
  currentConversation: ConversationItem;
  theme: string;
}> = ({ heightChatMain, maxWidthMessage, conversationId, type, currentConversation, theme }) => {
  const { messages, hasMoreMessage } = useAppSelector(chatSelector);
  const [offset, setOffset] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(unmountMessage());
    if (type === 'screen') {
      dispatch(getAllMessage({ conversation_id: conversationId, offset: 0 }));
    }
    if (type === 'popup') {
      dispatch(getAllMessageByReceiverId({ receiverId: conversationId, offset: 0 }));
    }
  }, [conversationId, dispatch, type]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setOffset(0);
  }, [currentConversation]);

  return (
    <div style={{ overflowY: 'hidden', flexBasis: '0', flexGrow: '1' }}>
      <StyledChatMain id="scrollableDiv" height={heightChatMain}>
        <InfiniteScroll
          dataLength={messages.length}
          next={() => {
            setOffset(offset + 20);
            if (type === 'screen') {
              dispatch(getAllMessage({ conversation_id: conversationId, offset: offset + LIMITCHAT }));
            }
            if (type === 'popup') {
              dispatch(getAllMessageByReceiverId({ receiverId: conversationId, offset: offset + LIMITCHAT }));
            }
          }}
          hasMore={hasMoreMessage}
          inverse={true}
          loader={<CircularProgress sx={{ color: theme }} />}
          scrollableTarget="scrollableDiv"
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            rowGap: '1.2rem',
            overflow: 'unset',
            scrollBehavior: 'smooth',
          }}
        >
          {messages.map((mess: MessageItem) => (
            <Message
              key={mess.id}
              message={mess}
              maxWidth={maxWidthMessage}
              theme={theme}
              type={type}
              currentConversation={currentConversation}
            />
          ))}
          <div
            style={{
              display: 'none',
            }}
            ref={messagesEndRef}
          ></div>
        </InfiniteScroll>
      </StyledChatMain>
    </div>
  );
};

export default React.memo(ChatMain);
