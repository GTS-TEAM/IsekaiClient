import React from 'react';
import { createPortal } from 'react-dom';
import ChatMain from '../ChatMain';
import ChatView from '../ChatView';
import Header from '../Header';
import TypeMessage from '../TypeMessage';
import { PopupWrap, StyledPopup } from './styles';

const popup = document.querySelector('#popup') as HTMLDivElement;

const PopupChat: React.FC<{
  conversationId: string;
}> = ({ conversationId }) => {
  return popup
    ? createPortal(
        <PopupWrap>
          <StyledPopup>
            <Header
              borderRadius="var(--borderRadius2) var(--borderRadius2) 0 0"
              type="popup"
              conservationId={conversationId}
            />
            <ChatMain conversationId="1" heightChatMain="40rem" />
            <TypeMessage conversationId={conversationId} type="private" />
            <ChatView />
          </StyledPopup>
        </PopupWrap>,
        popup,
      )
    : null;
};

export default PopupChat;
