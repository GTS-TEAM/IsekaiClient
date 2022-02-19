import { Avatar } from '@mui/material';
import React from 'react';
import Features from '../Features/Features';
import { MessageWrapStyled, StyledMessage } from './styles';

interface Props {
  left: boolean;
  content: string;
}

const Message: React.FC<Props> = ({ left, content }) => {
  return (
    <MessageWrapStyled left={left}>
      <Features left={left} />
      <StyledMessage timeCreated={'02:34'}>{content}</StyledMessage>
      <Avatar />
    </MessageWrapStyled>
  );
};

export default Message;
