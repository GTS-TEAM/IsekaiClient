import { CircularProgress } from '@mui/material';
import { chatSelector, getAllMessage, unmountMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MessageItem } from 'share/types';
import Message from '../Message';
import { StyledChatMain } from './styles';

const ChatMain: FC<{
  heightChatMain?: string;
  maxWidthMessage?: string;
  conversationId: string;
}> = ({ heightChatMain, maxWidthMessage, conversationId }) => {
  const { messages, hasMore, currentConversation } = useAppSelector(chatSelector);
  const [offset, setOffset] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(unmountMessage());
    dispatch(getAllMessage({ conversation_id: conversationId, offset: 0 }));
  }, [conversationId, dispatch]);

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
            dispatch(getAllMessage({ conversation_id: conversationId, offset: offset + 20 }));
          }}
          hasMore={hasMore}
          inverse={true}
          loader={<CircularProgress sx={{ color: currentConversation?.theme || 'var(--mainColor)' }} />}
          scrollableTarget="scrollableDiv"
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
            rowGap: '1.2rem',
            overflow: 'unset',
            scrollBehavior: 'smooth',
          }}
          // endMessage={
          //   <EndChat>
          //     <Avatar />
          //     <h3>Minh Nguyen</h3>
          //     <span>Bạn bè</span>
          //     <span>Các bạn là bạn bè trên Isekai</span>
          //   </EndChat>
          // }
        >
          {messages.map((mess: MessageItem) => (
            <Message key={mess.id} message={mess} maxWidth={maxWidthMessage} theme={currentConversation?.theme as string} />
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
