import { Stack } from '@mui/material';
import { IMG } from 'images';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { StyledModal, Header, Title, CloseButton, SelectionBox, Body, UploadBox } from './Styles';

const variants = {
  hidden: { opacity: 0, scale: 0.1, x: '-50%', y: '-50%', left: '50%', top: '50%' },
  visible: { opacity: 1, scale: 1, x: '-50%', y: '-50%', left: '50%', top: '50%' },
};

const modal = document.querySelector('#modal');
const Modal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);

  const chooseOptionHandler = (type) => () => {
    setType(type);
    setStep(step + 1);
  };

  return createPortal(
    <StyledModal initial="hidden" animate="visible" exit="hidden" variants={variants}>
      {step === 1 && (
        <React.Fragment>
          <Header>
            <Title>Cập nhật ảnh đại diện</Title>
            <CloseButton onClick={onClose}>
              <GrFormClose />
            </CloseButton>
          </Header>
          <Body>
            <Stack direction="row" columnGap="2.5rem">
              <SelectionBox onClick={chooseOptionHandler('upload')}>
                <img src={IMG.ChangeProfile} alt="" />
                <span>Tải ảnh lên</span>
              </SelectionBox>
              <SelectionBox onClick={chooseOptionHandler('choose')}>
                <img src={IMG.UploadProfile} alt="" />
                <span>Chọn từ ảnh</span>
              </SelectionBox>
            </Stack>
          </Body>
        </React.Fragment>
      )}
      {step === 2 && type === 'upload' && (
        <React.Fragment>
          <Header>
            <Title>Tải ảnh lên</Title>
            <CloseButton onClick={onClose}>
              <GrFormClose />
            </CloseButton>
          </Header>
          <Stack>
            <Body>
              <UploadBox>
                <img src={IMG.AddProfile} alt="" />
                <span>Chọn ảnh để tải lên avatar</span>
              </UploadBox>
            </Body>
          </Stack>
        </React.Fragment>
      )}
      {step === 2 && type === 'choose' && (
        <React.Fragment>
          <Header>
            <Title>Cập nhật ảnh đại diện</Title>
            <CloseButton></CloseButton>
          </Header>
          <Stack>
            <SelectionBox>upload</SelectionBox>
            <SelectionBox>choose</SelectionBox>
          </Stack>
        </React.Fragment>
      )}
    </StyledModal>,
    modal,
  );
};

export default Modal;
