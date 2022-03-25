import { Grid, SearchBar, SearchContext, SearchContextManager } from '@giphy/react-components';
import { ClickAwayListener } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { chatSelector, submitMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ConversationItem, ConversationType, MessageType, User } from 'share/types';
import { getReceiver } from 'utils/getReceiver';
import { StyledDropdownMenu } from './styles';

const Gif: React.FC<{
  onSelect?: () => any;
  isShow: boolean;
  setIsShow: (isShow: boolean) => any;
}> = ({ setIsShow, isShow }) => {
  return isShow ? (
    <SearchContextManager apiKey={'85ZYCE2GMU80hqiUc1WzTlZHzARSoy35'}>
      <ClickAwayListener
        onClickAway={() => {
          setIsShow(false);
        }}
      >
        <Component />
      </ClickAwayListener>
    </SearchContextManager>
  ) : null;
};

const Component = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector(chatSelector);
  const { user } = useAppSelector(authSelector);
  const { id } = useParams();
  return (
    <StyledDropdownMenu ref={ref}>
      <SearchBar />
      <Grid
        fetchGifs={fetchGifs}
        columns={2}
        gutter={12}
        width={280}
        key={searchKey}
        onGifClick={(gif, e) => {
          e.preventDefault();
          if (currentConversation?.type === ConversationType.GROUP) {
            dispatch(
              submitMessage({ message: gif.images.original.url, conversationId: id as string, type: MessageType.GIF }),
            );
          } else {
            const receiver = getReceiver(currentConversation as ConversationItem, user as User)?.user;
            dispatch(submitMessage({ message: gif.images.original.url, receiverId: receiver?.id, type: MessageType.GIF }));
          }
        }}
      />
    </StyledDropdownMenu>
  );
});

export default Gif;
