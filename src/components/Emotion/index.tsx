import { ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { EmotionItem } from 'share/types';
import emotions from '../../utils/emotions';
import { StyledListSearch, StyledStatus } from './Styles';

//TODO: RENAME THIS FOLDER

interface Props {
  status: EmotionItem | null;
  setStatus: (value: EmotionItem) => any;
  setHaveChooseEmoji: (value: boolean) => any;
}

const Status: React.FC<Props> = ({ setStatus, status, setHaveChooseEmoji }) => {
  const [textInput, setTextInput] = useState<string>('');
  const [search, setSearch] = useState<EmotionItem[]>();

  const changeTextInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setSearch(emotions.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setSearch([]);
      }}
    >
      <StyledStatus>
        <div className="input-wrap">
          <input
            onChange={changeTextInputHandler}
            value={textInput}
            onFocus={() => {
              setSearch(emotions.filter((item) => item.name.toLowerCase().includes(textInput.toLowerCase())));
            }}
            placeholder="Tìm kiếm"
          />
          <div className="icon">
            <BiSearch />
          </div>
          <div
            className="icon close"
            onClick={() => {
              setHaveChooseEmoji(false);
            }}
          >
            <IoCloseOutline />
          </div>
        </div>
        <StyledListSearch>
          {(search?.length as number) > 0 ? (
            <ul>
              {search?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setStatus(item);
                    setHaveChooseEmoji(false);
                  }}
                  className={item.id === status?.id ? 'selected' : undefined}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </StyledListSearch>
      </StyledStatus>
    </ClickAwayListener>
  );
};

export default Status;
