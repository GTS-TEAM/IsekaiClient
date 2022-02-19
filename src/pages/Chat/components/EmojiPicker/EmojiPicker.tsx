import ClickOutSide from 'components/ClickOutSide/ClickOutSide';
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
    <ClickOutSide
      handler={() => {
        setIsShow(false);
      }}
    >
      {(ref) => (
        <StyledEmoji ref={ref}>
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
      )}
    </ClickOutSide>
  ) : null;
};

export default EmojiPicker;
