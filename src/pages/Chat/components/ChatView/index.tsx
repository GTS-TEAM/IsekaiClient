import React from 'react';
import { useParams } from 'react-router-dom';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';

const ChatView = () => {
  const { id: conversationId } = useParams();

  return (
    <>
      <Header />
      <ChatMain conversationId={conversationId as string} />
      <TypeMessage />
    </>
  );
};

export default React.memo(ChatView);
