import { Avatar } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import moment from 'moment';
import React from 'react';
import { MessageItem } from 'share/types';
import Features from '../Features';
import { MessageWrapStyled, StyledMessage } from './styles';

interface Props {
  message: MessageItem;
  maxWidth?: string;
  type: string;
}

const Message: React.FC<Props> = ({ message, type }) => {
  const { user: currentUser } = useAppSelector(authSelector);

  return (
    <MessageWrapStyled left={currentUser?.id === message.sender?.id} type={type}>
      <Features left={currentUser?.id === message.sender?.id} />
      <StyledMessage type={type} timeCreated={moment(message.created_at).format('HH:MM')}>
        {message.content}
      </StyledMessage>
      {message.sender && <Avatar src={message.sender.avatar} alt={message.sender.username} />}
    </MessageWrapStyled>
  );
};

export default Message;
