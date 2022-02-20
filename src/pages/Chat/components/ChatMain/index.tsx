import React from 'react';
import Message from '../Message';
import { StyledChatMain } from './styles';

const ChatMain = () => {
  return (
    <StyledChatMain>
      <Message
        left={true}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam facere, voluptatem quis, minima consequatur voluptates animi repudiandae dolores fugiat, laudantium id dolore tempore nulla.'
        }
      />
      <Message
        left={false}
        content={
          'Hi asdf salfjas lfjasdl fjalsdjflasdjflajdfl lasdjflasdjfl askdfjalsdf lasdjf lasdjflas dfjalsdjfaldjfa ovha lahoang asudljasdfl'
        }
      />
      <Message
        left={true}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam facere, voluptatem quis, minima consequatur voluptates animi repudiandae dolores fugiat, laudantium id dolore tempore nulla.'
        }
      />
      <Message
        left={false}
        content={
          'Hi asdf salfjas lfjasdl fjalsdjflasdjflajdfl lasdjflasdjfl askdfjalsdf lasdjf lasdjflas dfjalsdjfaldjfa ovha lahoang asudljasdfl'
        }
      />
      <Message
        left={true}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam facere, voluptatem quis, minima consequatur voluptates animi repudiandae dolores fugiat, laudantium id dolore tempore nulla.'
        }
      />
      <Message
        left={true}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam facere, voluptatem quis, minima consequatur voluptates animi repudiandae dolores fugiat, laudantium id dolore tempore nulla.'
        }
      />
      <Message
        left={true}
        content={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aliquam itaque qui delectus laudantium? Ullam facere, voluptatem quis, minima consequatur voluptates animi repudiandae dolores fugiat, laudantium id dolore tempore nulla.'
        }
      />
      <Message
        left={false}
        content={
          'Hi asdf salfjas lfjasdl fjalsdjflasdjflajdfl lasdjflasdjfl askdfjalsdf lasdjf lasdjflas dfjalsdjfaldjfa ovha lahoang asudljasdfl'
        }
      />
      <Message
        left={false}
        content={
          'Hi asdf salfjas lfjasdl fjalsdjflasdjflajdfl lasdjflasdjfl askdfjalsdf lasdjf lasdjflas dfjalsdjfaldjfa ovha lahoang asudljasdfl'
        }
      />
      <Message left={false} content={'Hi asdf '} />
    </StyledChatMain>
  );
};

export default ChatMain;
