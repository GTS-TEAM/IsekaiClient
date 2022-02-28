import { Alert, Box, CircularProgress, ClickAwayListener } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { authSelector } from 'features/authSlice';
import { chatSelector, submitMessage } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react';
import { AiOutlineGif, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { BiSticker } from 'react-icons/bi';
import { FiFile } from 'react-icons/fi';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { ConversationType, MessageType, User } from 'share/types';
import { getReceiver } from 'utils/getReceiver';
import Gif from '../Gif';
import { ButtonOpenMore, ButtonSend, InputEmoji, InputMessage, StyledTypeMessage } from './styles';

const EmojiPicker = React.lazy(() => import('../EmojiPicker'));

const TypeMessage: React.FC<{
  conversationId: string;
  type?: string;
}> = ({ conversationId, type = 'private' }) => {
  const [textMessage, setTextMessage] = useState<string>('');
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [isShowGif, setIsShowGif] = useState<boolean>(false);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [sentLoading, setSentLoading] = useState(false);
  const { currentConversation } = useAppSelector(chatSelector);
  const { user: currentUser } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

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
        dispatch(submitMessage({ message: textMessage, conversationId: currentConversation.id }));
      } else {
        const receiver = getReceiver(currentConversation, currentUser as User);
        console.log(receiver);
        dispatch(submitMessage({ message: textMessage, receiverId: receiver?.id }));
      }
    }
    setTextMessage('');
  };

  const uploadFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setIsShowError(true);
      setIsShowDropdown(false);

      return;
    }

    let type = file.type.includes(MessageType.IMAGE)
      ? MessageType.IMAGE
      : file.type.includes(MessageType.AUDIO)
      ? MessageType.AUDIO
      : file.type.includes(MessageType.VIDEO)
      ? MessageType.VIDEO
      : MessageType.FILE;
    let url;
    const formData = new FormData();

    setSentLoading(true);
    if (type === MessageType.AUDIO || type === MessageType.VIDEO) {
      formData.append('file', file);
      const { data } = await isekaiApi.uploadSongFile(formData);
      url = data.url;
    } else {
      formData.append('files', file);
      const { data } = await isekaiApi.uploadImg(formData);
      url = data.urls[0];
    }

    if (currentConversation?.type === ConversationType.GROUP) {
      dispatch(submitMessage({ message: url as string, conversationId: currentConversation.id, type }));
    } else {
      const receiver = getReceiver(currentConversation, currentUser as User);
      console.log(receiver);
      dispatch(submitMessage({ message: url as string, receiverId: receiver?.id, type }));
    }
    setSentLoading(false);
  };

  const changeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsShowDropdown(false);
    uploadFile(file);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowError(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });

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
          sx={{
            backgroundColor: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
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
                <DropdownItem
                  onClick={() => {
                    setIsShowGif(true);
                    setIsShowDropdown(false);
                  }}
                >
                  <AiOutlineGif />
                  <Box>
                    <h3>GIF</h3>
                    <span>Truyền tải chính xác ý bạn muốn nói.</span>
                  </Box>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    inputFileRef.current?.click();
                  }}
                >
                  <FiFile />
                  <Box>
                    <h3>Tệp</h3>
                    <span>Thêm tệp vào cuộc trò chuyện của bạn.</span>
                  </Box>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={inputFileRef}
                    onChange={changeFileHandler}
                    accept="image/jpeg,image/gif,image/png,application/pdf,video/*,audio/*"
                  />
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
          sx={{
            svg: {
              color: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
            },
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

      {sentLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
          }}
        />
      ) : (
        <ButtonSend
          onClick={sendMessageHandler}
          sx={{
            svg: {
              color: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
            },
          }}
        >
          <AiOutlineSend />
        </ButtonSend>
      )}
      <Gif isShow={isShowGif} setIsShow={setIsShowGif} />
      {isShowError && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.6rem',
            fontWeight: '500',
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            zIndex: '101',
          }}
        >
          File phải nhỏ hơn 5MB
        </Alert>
      )}
    </StyledTypeMessage>
  );
};

TypeMessage.defaultProps = { type: 'private' };

export default React.memo(TypeMessage);
