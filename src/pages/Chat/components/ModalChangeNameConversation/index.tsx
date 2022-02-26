import { Box, Button, ClickAwayListener, IconButton } from '@mui/material';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { chatSelector, updateConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { Body, StyledModal } from './styles';

const ModalChangeNameConversation: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ isShow, onClose }) => {
  const { currentConversation } = useAppSelector(chatSelector);
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
                      conversationId: currentConversation?.id,
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
