import { Button } from '@mui/material';
import autosize from 'autosize';
import { editUserInfo } from 'features/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledInputBio } from './Styles';

const InputBio = ({ bio, onClose }) => {
  const [text, setText] = useState(bio);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const changeTextBioHandler = (e) => {
    setText(e.target.value);
    if (e.target.value === bio) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const saveHandler = () => {
    if (text === bio) {
      setIsDisabled(true);
      return;
    } else {
      setIsDisabled(false);
    }
    dispatch(
      editUserInfo({
        bio: text,
      }),
    );
    setText('');
    onClose();
  };

  useEffect(() => {
    autosize(document.querySelector('textarea'));
  }, []);
  return (
    <StyledInputBio>
      <textarea placeholder="Mô tả về bạn" value={text} onChange={changeTextBioHandler} />
      <div className="btn-group">
        <Button className="cancel" onClick={onClose}>
          Hủy
        </Button>
        <Button className="save" disabled={isDisabled} onClick={saveHandler}>
          Lưu
        </Button>
      </div>
    </StyledInputBio>
  );
};

export default InputBio;
