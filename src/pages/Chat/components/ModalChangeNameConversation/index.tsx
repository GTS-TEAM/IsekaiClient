import { Box, Button, ClickAwayListener, IconButton } from '@mui/material';
import ModalWrapper from 'components/Modal';
import { Header } from 'components/Modal/Styles';
import { updateConversation } from 'features/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { ConversationItem } from 'share/types';
import { Body, StyledModal } from './styles';

const ModalChangeNameConversation: React.FC<{
  onClose: () => any;
  isShow: boolean;
  currentConversation: ConversationItem;
}> = ({ isShow, onClose, currentConversation }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  return isShow ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal>
          <Header>
            <h3>Đổi tên đoạn chat</h3>
            <IconButton onClick={onClose}>
              <GrFormClose />
            </IconButton>
          </Header>
          <Body>
            <input
              type="text"
              placeholder="Tên đoạn chat"
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <Box>
              <Button
                className="cancel"
                onClick={() => {
                  onClose();
                  setText('');
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
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
                }}
                className="save"
                sx={{
                  backgroundColor: currentConversation?.theme || 'var(--mainColor)',
                  '&:hover': {
                    backgroundColor: currentConversation?.theme || 'var(--mainColor)',
                  },
                }}
                disabled={text.trim().length === 0}
              >
                Lưu
              </Button>
            </Box>
          </Body>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default ModalChangeNameConversation;
