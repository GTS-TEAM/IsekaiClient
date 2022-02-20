import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { IMG } from 'images';
import React from 'react';
import { createPortal } from 'react-dom';
import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { ButtonStart, ModalBody, ModalHeader, StyledModal, StyledModalWrap } from './styles';

const modal = document.querySelector('#modal') as Element;

const Modal: React.FC<{ isOpen: boolean; onClose: () => any }> = ({ isOpen, onClose }) => {
  return isOpen
    ? createPortal(
        <StyledModalWrap>
          <ClickAwayListener onClickAway={onClose}>
            <StyledModal>
              <ModalHeader>
                <h3>Cuộc trò chuyện mới</h3>
                <IconButton onClick={onClose}>
                  <GrFormClose />
                </IconButton>
              </ModalHeader>
              <ModalBody>
                <img src={IMG.Bubbles} alt="" />
                <Box className="input-field">
                  <div className="icon">
                    <BiSearch />
                  </div>
                  <input type="text" placeholder="Tìm kiếm..." />
                </Box>
                <p>Chọn một người dùng để bắt đầu một cuộc trò chuyện mới.</p>
                <ButtonStart>Bắt đầu cuộc trò chuyện</ButtonStart>
              </ModalBody>
            </StyledModal>
          </ClickAwayListener>
        </StyledModalWrap>,
        modal,
      )
    : null;
};

export default Modal;
