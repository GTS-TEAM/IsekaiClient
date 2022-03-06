import { Box, CircularProgress, ClickAwayListener, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import autosize from 'autosize';
import ErrorAlert from 'components/ErrorAlert';
import { authSelector } from 'features/authSlice';
import { chatSelector, submitMessage } from 'features/chatSlice';
import { DropdownContent, DropdownItem, DropdownMenu } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent, Suspense, useEffect, useRef, useState } from 'react';
import { AiOutlineGif, AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { BiSticker } from 'react-icons/bi';
import { FiFile, FiFileText } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { ConversationItem, ConversationType, FileType, MessageType, User } from 'share/types';
import { getReceiver } from 'utils/getReceiver';
import { v4 as uuid } from 'uuid';
import Gif from '../Gif';
import {
  ButtonOpenMore,
  ButtonSend,
  FilePreview,
  InputEmoji,
  InputMessage,
  ListFilesPreview,
  StyledTypeMessage,
} from './styles';
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
  const inputTextRef = useRef<HTMLTextAreaElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [sentLoading, setSentLoading] = useState(false);
  const [files, setFiles] = useState<
    {
      id: string;
      link: string;
      name: string;
      type: string;
    }[]
  >([]);
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
    const filesToSend = files.map((file) => {
      return {
        name: file.name,
        link: file.link,
        type: file.type,
      };
    });

    if (textMessage.trim().length === 0 && files.length === 0) {
      return;
    } else {
      if (currentConversation?.type === ConversationType.GROUP) {
        dispatch(
          submitMessage({
            message: textMessage.trim(),
            conversationId: currentConversation.id,
            files: filesToSend.length > 0 ? filesToSend : undefined,
          }),
        );
      } else {
        const receiver = getReceiver(currentConversation as ConversationItem, currentUser as User);
        dispatch(
          submitMessage({
            message: textMessage.trim(),
            receiverId: receiver?.id,
            files: filesToSend.length > 0 ? filesToSend : undefined,
          }),
        );
      }
    }
    setTextMessage('');
    setFiles([]);
  };

  const uploadFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setIsShowError(true);
      setIsShowDropdown(false);

      return;
    }

    let type = file.type.includes(FileType.IMAGE)
      ? FileType.IMAGE
      : file.type.includes(FileType.AUDIO)
      ? FileType.AUDIO
      : file.type.includes(FileType.VIDEO)
      ? FileType.VIDEO
      : FileType.FILE;
    let url: string;
    const formData = new FormData();

    setSentLoading(true);
    if (type === FileType.AUDIO || type === FileType.VIDEO) {
      formData.append('files', file);
      const { data } = await isekaiApi.uploadVideoOrMusicMessage(formData);
      url = data.urls[0];
    } else {
      formData.append('files', file);
      const { data } = await isekaiApi.uploadImg(formData);
      url = data.urls[0];
    }

    setFiles((files) => {
      return [
        ...files,
        {
          id: uuid(),
          name: file.name,
          link: url,
          type,
        },
      ];
    });

    // if (currentConversation?.type === ConversationType.GROUP) {
    //   dispatch(submitMessage({ message: url as string, conversationId: currentConversation.id, type }));
    // } else {
    //   const receiver = getReceiver(currentConversation as ConversationItem, currentUser as User);
    //   dispatch(submitMessage({ message: url as string, receiverId: receiver?.id, type }));
    // }
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
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      autosize(textarea);
    }
  }, []);

  return (
    <>
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
          {files.length > 0 && (
            <ListFilesPreview>
              {files.map((file) => (
                <li key={file.id}>
                  {file.type === FileType.IMAGE || file.type === MessageType.GIF ? (
                    <img src={file.link} alt={file.name} />
                  ) : (
                    <FilePreview>
                      <FiFileText />
                      <span>{file.name}</span>
                    </FilePreview>
                  )}
                  <IconButton
                    onClick={() => {
                      setFiles((files) => [...files].filter((fileItem) => fileItem.id !== file.id));
                    }}
                  >
                    <IoCloseOutline />
                  </IconButton>
                </li>
              ))}
            </ListFilesPreview>
          )}
          <Box>
            <textarea
              ref={inputTextRef}
              placeholder="Aa"
              value={textMessage}
              onChange={(e) => {
                setTextMessage(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
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
          </Box>
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
        <ErrorAlert
          isShow={isShowError}
          onClose={() => {
            setIsShowError(false);
          }}
        >
          File phải nhỏ hơn 5MB
        </ErrorAlert>
      </StyledTypeMessage>
    </>
  );
};

TypeMessage.defaultProps = { type: 'private' };

export default React.memo(TypeMessage);
