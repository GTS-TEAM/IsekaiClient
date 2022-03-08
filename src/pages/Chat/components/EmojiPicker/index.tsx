import { ClickAwayListener } from '@mui/material';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { StyledEmoji } from './styles';
const EmojiPicker: React.FC<{
  isShow: boolean;
  onSelect: (emoji: any) => void;
  setIsShow: (isShow: boolean) => any;
}> = ({ isShow, onSelect, setIsShow }) => {
  return isShow ? (
    <ClickAwayListener
      onClickAway={() => {
        setIsShow(false);
      }}
    >
      <StyledEmoji>
        <Picker
          onSelect={onSelect}
          set="facebook"
          enableFrequentEmojiSort
          showPreview={false}
          showSkinTones={false}
          emojiTooltip
          defaultSkin={1}
          color="var(--mainColor)"
        />
      </StyledEmoji>
    </ClickAwayListener>
  ) : null;
};

export default EmojiPicker;
