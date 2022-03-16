import { Box, Button, ClickAwayListener, IconButton } from '@mui/material';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import { Body, StyledModal } from './styles';

const ModalConfirm: React.FC<{
  header: string;
  content: string;
  onConfirm: () => any;
  onClose: () => any;
  isShow: boolean;
  theme?: string;
}> = ({ content, onClose, onConfirm, children, header, isShow, theme }) => {
  return isShow ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal>
          <Header>
            <h3>{header}</h3>
            <IconButton onClick={onClose}>
              <GrFormClose />
            </IconButton>
          </Header>
          <Body>
            <p>{content}</p>
            <Box>
              <Button
                sx={{
                  backgroundColor: '#bdbdbd',

                  '&:hover': {
                    backgroundColor: '#bdbdbd',
                  },
                }}
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                onClick={onConfirm}
                sx={{
                  backgroundColor: theme ? theme : 'var(--mainColor)',

                  '&:hover': {
                    backgroundColor: theme ? theme : 'var(--mainColor)',
                  },
                }}
              >
                Xác nhận
              </Button>
            </Box>
          </Body>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default ModalConfirm;
