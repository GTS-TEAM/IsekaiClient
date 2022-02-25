import { Box, CircularProgress, ClickAwayListener } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector, submitMessage } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { Suspense, useRef, useState } from 'react';
import { AiOutlineGif, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { BiSticker } from 'react-icons/bi';
import { FiFile } from 'react-icons/fi';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { ConversationType } from 'share/types';
import { ButtonOpenMore, ButtonSend, InputEmoji, InputMessage, StyledTypeMessage } from './styles';

const EmojiPicker = React.lazy(() => import('../EmojiPicker'));

const TypeMessage: React.FC<{
  conversationId: string;
  type?: string;
}> = ({ conversationId, type = 'private' }) => {
  const [textMessage, setTextMessage] = useState<string>('');
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const { currentConversation, conversations } = useAppSelector(chatSelector);
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(authSelector);

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

  const sendMessageHandler = () => {
    if (textMessage.trim().length === 0) {
      return;
    } else {
      if (currentConversation?.type === ConversationType.GROUP) {
        dispatch(submitMessage({ message: textMessage, conversationId: conversationId }));
      } else {
        const receiver = currentConversation.members.find((member: any) => member.id !== conversationId);
        dispatch(submitMessage({ message: textMessage, receiverId: receiver?.id }));
      }
    }
    setTextMessage('');
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.stopPropagation();
              sendMessageHandler();
            }
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
      <ButtonSend onClick={sendMessageHandler}>
        <AiOutlineSend />
      </ButtonSend>
    </StyledTypeMessage>
  );
};

TypeMessage.defaultProps = { type: 'private' };

export default React.memo(TypeMessage);
