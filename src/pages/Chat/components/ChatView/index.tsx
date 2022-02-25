import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';

const ChatView = () => {
  const { id: conversationId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  return (
    <>
      <Header conservationId={conversationId as string} />
      <ChatMain conversationId={conversationId as string} />
      <TypeMessage type={type ? type : undefined} conversationId={conversationId as string} />
    </>
  );
};

export default ChatView;
