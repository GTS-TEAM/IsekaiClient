import { chatSelector, selectPopupChat, startConnecting, unmountChat } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import ChatMain from '../ChatMain';
import Header from '../Header';
import TypeMessage from '../TypeMessage';
import { PopupWrap, StyledPopup } from './styles';

const popup = document.querySelector('#popup') as HTMLDivElement;

const PopupChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { popupChat } = useAppSelector(chatSelector);
  const location = useLocation();

  useEffect(() => {
    dispatch(startConnecting());

    return () => {
      dispatch(unmountChat());
    };
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname.includes('message')) {
      dispatch(
        selectPopupChat({
          receiverId: '',
          currentConversation: null,
        }),
      );
    }
  }, [dispatch, location]);

  return popupChat.currentConversation && popupChat.receiverId
    ? popup
      ? createPortal(
          <PopupWrap>
            <StyledPopup>
              <Header
                borderRadius="var(--borderRadius2) var(--borderRadius2) 0 0"
                type="popup"
                onClose={() => {
                  dispatch(
                    selectPopupChat({
                      receiverId: '',
                      currentConversation: null,
                    }),
                  );
                }}
                currentConversation={popupChat.currentConversation}
              />
              <ChatMain
                conversationId={popupChat.receiverId}
                heightChatMain="40rem"
                type="popup"
                currentConversation={popupChat.currentConversation}
              />
              <TypeMessage currentConversation={popupChat.currentConversation} />
            </StyledPopup>
          </PopupWrap>,
          popup,
        )
      : null
    : null;
};

export default PopupChat;
