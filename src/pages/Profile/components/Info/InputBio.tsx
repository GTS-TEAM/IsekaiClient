import { Button } from '@mui/material';
import autosize from 'autosize';
import { editUserInfo } from 'features/userSlice';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledInputBio } from './Styles';

interface Props {
  bio: string;
  onClose: () => any;
}

const InputBio: React.FC<Props> = ({ bio, onClose }) => {
  const [text, setText] = useState<string>(bio);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  const changeTextBioHandler = (e: FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (e.currentTarget.value === bio) {
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
    const textarea = document.querySelector('textarea');
    if (textarea) {
      autosize(textarea);
    }
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
