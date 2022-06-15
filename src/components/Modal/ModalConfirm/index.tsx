import React from 'react';
import ModalWrapper from '../ModalWrapper';
import { Body } from './styles';

const ModalConfirm: React.FC<{
  header: string;
  content: string;
  onConfirm: () => any;
  onClose: () => any;
  isShow: boolean;
  theme?: string;
}> = ({ content, onClose, onConfirm, children, header, isShow, theme }) => {
  return isShow ? (
    <ModalWrapper
      titleHeader={header}
      textCancel="Hủy"
      textOk="Xác nhận"
      onClose={onClose}
      onOk={onConfirm}
      propsButtonOk={{
        sx: {
          backgroundColor: `${theme} !important`,

          '&:hover': {
            backgroundColor: `${theme} !important`,
          },
        },
      }}
    >
      <Body>
        <p>{content}</p>
      </Body>
    </ModalWrapper>
  ) : null;
};

export default ModalConfirm;
