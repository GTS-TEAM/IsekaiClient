import { ModalWrapper } from 'components/Modal';
import { updateConversation } from 'features/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
import React, { useState } from 'react';
import { ConversationItem } from 'share/types';
import { Body } from './styles';

const ModalChangeNameConversation: React.FC<{
  onClose: () => any;
  isShow: boolean;
  currentConversation: ConversationItem;
}> = ({ isShow, onClose, currentConversation }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');

  const handleClose = () => {
    onClose();
    setText('');
  };

  const handleOk = () => {
    if (text.trim().length === 0) {
      onClose();
      return;
    }
    dispatch(
      updateConversation({
        conversationId: currentConversation?.id as string,
        fields: {
          name: text,
        },
      }),
    );
    onClose();
    setText('');
  };

  return isShow ? (
    <ModalWrapper
      titleHeader="Đổi tên đoạn chat"
      onClose={handleClose}
      onOk={handleOk}
      textCancel="Hủy"
      textOk="Chỉnh sửa"
      propsButtonOk={{
        sx: {
          backgroundColor: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',

          '&:hover': {
            backgroundColor: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
          },
        },
        disabled: text.trim().length === 0,
      }}
    >
      <Body>
        <input
          type="text"
          placeholder="Tên đoạn chat"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </Body>
    </ModalWrapper>
  ) : null;
};

export default ModalChangeNameConversation;
