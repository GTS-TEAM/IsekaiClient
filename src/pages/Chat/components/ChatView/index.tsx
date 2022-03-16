import { chatSelector } from 'features/chatSlice';
import { useAppSelector } from 'hooks/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ConversationItem } from 'share/types';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';

const ChatView = () => {
  const { id: conversationId } = useParams();
  const { currentConversation } = useAppSelector(chatSelector);

  return (
    <>
      <Header currentConversation={currentConversation as ConversationItem} />
      <ChatMain
        conversationId={conversationId as string}
        type="screen"
        currentConversation={currentConversation as ConversationItem}
      />
      <TypeMessage currentConversation={currentConversation as ConversationItem} />
    </>
  );
};

export default React.memo(ChatView);
