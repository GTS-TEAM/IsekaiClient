import { Box, CircularProgress, ClickAwayListener } from '@mui/material';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import React, { Suspense, useRef, useState } from 'react';
import { AiOutlineGif, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { BiSticker } from 'react-icons/bi';
import { FiFile } from 'react-icons/fi';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { ButtonOpenMore, ButtonSend, InputEmoji, InputMessage, StyledTypeMessage } from './styles';

const EmojiPicker = React.lazy(() => import('../EmojiPicker'));

const TypeMessage = () => {
  const [textMessage, setTextMessage] = useState<string>('');
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const inputTextRef = useRef<HTMLInputElement | null>(null);

  const changeTextMessageEmoji = (value: string) => {
    // two line get position of cursor
    const start = inputTextRef.current?.selectionStart as number;
    const end = inputTextRef.current?.selectionEnd as number;
    if (start === 0 && end === 0) {
      setTextMessage(textMessage + value);
    } else {
      const textMessageSplitted = textMessage.split('');
      textMessageSplitted.splice(start, end - start, value); // insert emoji at between start and end
      setTextMessage(textMessageSplitted.join(''));
    }
  };

  return (
    <StyledTypeMessage>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <ButtonOpenMore
          onClick={() => {
            setIsShowDropdown(!isShowDropdown);
          }}
        >
          <AiOutlinePlus />
        </ButtonOpenMore>
        {isShowDropdown && (
          <ClickAwayListener
            onClickAway={() => {
              setIsShowDropdown(false);
            }}
          >
            <DropdownMenu left="0" bottom="calc(100% + 1.2rem)">
              <DropdownContent>
                <DropdownItem>
                  <AiOutlineGif />
                  <Box>
                    <h3>GIF</h3>
                    <span>Truyền tải chính xác ý bạn muốn nói.</span>
                  </Box>
                </DropdownItem>
                <DropdownItem>
                  <FiFile />
                  <Box>
                    <h3>Tệp</h3>
                    <span>Thêm tệp vào cuộc trò chuyện của bạn.</span>
                  </Box>
                </DropdownItem>
                <DropdownItem>
                  <BiSticker />
                  <Box>
                    <h3>Nhãn dán</h3>
                    <span>Giúp cuộc trò chuyện trở nên sinh động.</span>
                  </Box>
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </ClickAwayListener>
        )}
      </Box>
      <InputMessage>
        <input
          ref={inputTextRef}
          type="text"
          placeholder="Aa"
          value={textMessage}
          onChange={(e) => {
            setTextMessage(e.target.value);
          }}
        />
        <InputEmoji
          onClick={() => {
            setIsShowEmojiPicker(!isShowEmojiPicker);
          }}
        >
          <MdOutlineEmojiEmotions />
        </InputEmoji>
        <Suspense fallback={<CircularProgress />}>
          <EmojiPicker
            onSelect={(emoji) => {
              changeTextMessageEmoji(emoji.native);
            }}
            setIsShow={setIsShowEmojiPicker}
            isShow={isShowEmojiPicker}
          />
        </Suspense>
      </InputMessage>
      <ButtonSend>
        <AiOutlineSend />
      </ButtonSend>
    </StyledTypeMessage>
  );
};

export default TypeMessage;
