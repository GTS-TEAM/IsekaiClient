import { Avatar } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React from 'react';
import { MessageItem, MessageType } from 'share/types';
import Features from '../Features';
import { MessageWrapStyled, StyledMessage } from './styles';

interface Props {
  message: MessageItem;
  maxWidth?: string;
  type: string;
  theme: string | null;
}

const Message: React.FC<Props> = ({ message, type, theme }) => {
  const { user: currentUser } = useAppSelector(authSelector);

  return (
    <MessageWrapStyled left={currentUser?.id === message.sender?.id} type={type}>
      <Features left={currentUser?.id === message.sender?.id} />
      {type === MessageType.TEXT || type === MessageType.SYSTEM ? (
        <StyledMessage type={type} themeStyle={theme} timeCreated={moment(message.created_at).format('HH:MM')}>
          {message.content}
        </StyledMessage>
      ) : null}
      {type === MessageType.GIF && <img src={message.content} alt="" />}
      {message.sender && <Avatar src={message.sender.avatar} alt={message.sender.username} />}
    </MessageWrapStyled>
  );
};

export default Message;
