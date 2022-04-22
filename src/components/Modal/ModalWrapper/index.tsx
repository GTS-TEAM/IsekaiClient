import { Button, ButtonProps, ClickAwayListener, IconButton, Typography } from '@mui/material';
import React from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { Header, Modal, StyledFooter, StyledModalWrap } from './Styles';

const modal = document.querySelector('#modal') as Element;

interface Props {
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  titleHeader?: string;
  onClose?: () => void;
  onOk?: () => void;
  width?: string | number;
  textCancel?: string;
  textOk?: string;
  hiddenButtonCancel?: boolean;
  hiddenButtonOk?: boolean;
  propsButtonOk?: ButtonProps;
  propsButtonCancel?: ButtonProps;
}

const ModalWrapper: React.FC<Props> = (props) => {
  return createPortal(
    <StyledModalWrap>
      <ClickAwayListener
        onClickAway={() => {
          props.onClose && props.onClose();
        }}
      >
        <Modal width={props.width}>
          {props.customHeader ? (
            props.customHeader
          ) : (
            <Header>
              <Typography variant="h3">{props.titleHeader}</Typography>
              <IconButton onClick={props.onClose}>
                <IoClose />
              </IconButton>
            </Header>
          )}
          {props.children}
          {props.customFooter ? (
            props.customFooter
          ) : (
            <StyledFooter>
              {!props.hiddenButtonCancel && (
                <Button onClick={props.onClose} className="cancel">
                  {props.textCancel || 'Cancel'}
                </Button>
              )}
              {!props.hiddenButtonOk && (
                <Button {...props.propsButtonOk} onClick={props.onOk} className="ok">
                  {props.textOk || 'Ok'}
                </Button>
              )}
            </StyledFooter>
          )}
        </Modal>
      </ClickAwayListener>
    </StyledModalWrap>,
    modal,
  );
};

export default ModalWrapper;
