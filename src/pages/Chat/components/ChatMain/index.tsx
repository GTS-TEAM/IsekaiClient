import { chatSelector, getAllMessage, unmountChat } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MessageItem } from 'share/types';
import Message from '../Message';
import { StyledChatMain } from './styles';

const ChatMain: FC<{
  heightChatMain?: string;
  maxWidthMessage?: string;
  conversationId: string;
}> = ({ heightChatMain, maxWidthMessage, conversationId }) => {
  const { messages, hasMore } = useAppSelector(chatSelector);
  const [offset, setOffset] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(unmountChat());
    dispatch(getAllMessage({ conversation_id: conversationId, offset: 0 }));
  }, [conversationId, dispatch]);

  return (
    <StyledChatMain id="scrollableDiv" height={heightChatMain}>
      <InfiniteScroll
        dataLength={messages.length}
        next={() => {
          setOffset(offset + 10);
          dispatch(getAllMessage({ conversation_id: conversationId, offset: offset + 10 }));
        }}
        hasMore={hasMore}
        inverse={true}
        loader={<p>loading...</p>}
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
          <Message key={mess.id} message={mess} maxWidth={maxWidthMessage} type={mess.type} />
        ))}
      </InfiniteScroll>
    </StyledChatMain>
  );
};

export default React.memo(ChatMain);
