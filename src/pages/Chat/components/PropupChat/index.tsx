import { startConnecting, unmountChat } from 'features/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';
import { PopupWrap, StyledPopup } from './styles';

const popup = document.querySelector('#popup') as HTMLDivElement;

const PopupChat: React.FC<{
  conversationId: string;
  onClose: () => any;
}> = ({ conversationId, onClose }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startConnecting());

    return () => {
      dispatch(unmountChat());
    };
  }, [dispatch]);

  return popup
    ? createPortal(
        <PopupWrap>
          <StyledPopup>
            <Header borderRadius="var(--borderRadius2) var(--borderRadius2) 0 0" type="popup" onClose={onClose} />
            <ChatMain conversationId={conversationId} heightChatMain="40rem" type="popup" />
            <TypeMessage />
          </StyledPopup>
        </PopupWrap>,
        popup,
      )
    : null;
};

export default PopupChat;
