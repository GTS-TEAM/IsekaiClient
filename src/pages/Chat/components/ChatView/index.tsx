import { chatSelector, seenMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConversationItem } from 'share/types';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';
import { StyledChatView } from './Styles';

const ChatView = () => {
  const { id: conversationId } = useParams();
  const { currentConversation } = useAppSelector(chatSelector);
  const chatViewRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const theme = useMemo(() => {
    return currentConversation?.theme ? `${currentConversation.theme} !important` : 'var(--mainColor)  !important';
  }, [currentConversation]) as string;

  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (chatViewRef.current && !chatViewRef.current.contains(ev.target as Node)) {
        setIsFocus(false);
      } else {
        setIsFocus(true);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isFocus && currentConversation?.last_message) {
      dispatch(seenMessage({ conversationId: currentConversation?.id, messageId: currentConversation?.last_message?.id }));
    }
  }, [currentConversation?.last_message, dispatch, currentConversation?.id, isFocus]);

  return (
    <StyledChatView ref={chatViewRef}>
      <Header currentConversation={currentConversation as ConversationItem} theme={theme} />
      <ChatMain
        theme={theme}
        conversationId={conversationId as string}
        type="screen"
        currentConversation={currentConversation as ConversationItem}
      />
      <TypeMessage currentConversation={currentConversation as ConversationItem} theme={theme} />
    </StyledChatView>
  );
};

export default React.memo(ChatView);
