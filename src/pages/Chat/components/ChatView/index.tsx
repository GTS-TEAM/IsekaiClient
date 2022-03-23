import { authSelector } from 'features/authSlice';
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
  const { currentConversation, currentConversationSeen } = useAppSelector(chatSelector);
  const { user } = useAppSelector(authSelector);
  const chatViewRef = useRef<HTMLDivElement | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const theme = useMemo(() => {
    return isFocus
      ? currentConversation?.theme
        ? `${currentConversation.theme} !important`
        : 'var(--mainColor)  !important'
      : '#808080 !important';
  }, [isFocus, currentConversation]) as string;

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
    const isSeen = currentConversationSeen?.seen?.find((item) => item.user.id === user?.id);
    if (isFocus && currentConversation?.last_message?.id && !isSeen) {
      dispatch(
        seenMessage({
          conversationId: currentConversation?.id,
          messageId: currentConversation?.last_message?.id,
        }),
      );
    }
  }, [currentConversation, isFocus, dispatch, user, currentConversationSeen]);

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
