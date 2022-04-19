import { Avatar, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { ModalWrapper } from 'components/Modal';
import { authSelector } from 'features/authSlice';
import { addConversation, chatSelector, createGroup, selectConversation } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ConversationItem, ConversationType, Member, User } from 'share/types';
import { compareTwoArrMember } from 'utils/compareTwoArrMember';
import { v4 as uuidv4 } from 'uuid';
import { Body, ItemResult, ListChoose, ListResult } from './styles';

const ModalCreateConversation: React.FC<{
  onClose: () => any;
}> = ({ onClose }) => {
  const [result, setResult] = useState<User[] | null>(null);
  const [chooses, setChooses] = useState<User[]>([]);
  const { currentConversation, conversations, removedConversations } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(authSelector);
  const navigation = useNavigate();

  const handleSearch = useCallback(
    async (text: string) => {
      const { data } = await isekaiApi.globalSearch(text);
      setResult(data.filter((_user) => _user.id !== currentUser?.id));
    },
    [currentUser],
  );
  const isChecked = (id: string) => {
    return chooses.some((choose: User) => choose.id === id);
  };

  const handleStartChat = () => {
    // const currentMember=
    if (chooses.length >= 2) {
      const conversationExist = conversations.find((conversation) => {
        return compareTwoArrMember(conversation.members as Member[], [...chooses, currentUser as User]);
      });

      if (!conversationExist) {
        const choosesId: string[] = chooses.map((choose: any) => choose.id);
        dispatch(createGroup(choosesId));
      } else {
        navigation(`/message/${conversationExist?.id}`);
        dispatch(selectConversation(conversationExist));
      }
    } else {
      const newConversation: ConversationItem = {
        id: `${currentUser?.id}-${chooses[0].id}`,
        members: [
          {
            id: uuidv4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...chooses[0],
              last_activity: null,
            },
          },
          {
            id: uuidv4(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_conversation_at: null,
            nickname: null,
            role: 'member',
            //@ts-ignore
            user: {
              ...currentUser,
              last_activity: null,
            },
          },
        ],
        type: ConversationType.PRIVATE,
        last_message: null,
        avatar: null,
        name: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        theme: '#a56ffd',
        seen: [],
      };
      const conversationExist = conversations.find(
        (conversation) =>
          conversation.id === `${currentUser?.id}-${chooses[0].id}` ||
          conversation.id === `${chooses[0].id}-${currentUser?.id}`,
      );

      const conversationExitOnRemoved = removedConversations.find(
        (conversation) =>
          conversation.id === `${currentUser?.id}-${chooses[0].id}` ||
          conversation.id === `${chooses[0].id}-${currentUser?.id}`,
      );

      if (conversationExist) {
        navigation(`/message/${conversationExist?.id}`);
        dispatch(selectConversation(conversationExist));
      } else if (conversationExitOnRemoved) {
        navigation(`/message/${conversationExitOnRemoved.id}`);
        dispatch(selectConversation(conversationExitOnRemoved));
        dispatch(addConversation(conversationExitOnRemoved));
      } else {
        dispatch(selectConversation(newConversation));
        dispatch(addConversation(newConversation));
        navigation(`/message/${currentUser?.id}-${chooses[0].id}`);
      }
    }
    onClose();
    setChooses([]);
  };

  const closeHandler = () => {
    onClose();
    setChooses([]);
    setResult([]);
  };

  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <ModalWrapper
      titleHeader="Tạo cuộc trò chuyện"
      onClose={closeHandler}
      customFooter={
        <Box
          sx={{
            padding: '1.2rem',
          }}
        >
          <Button
            sx={{
              minHeight: '3.8rem',
              width: '100%',
              fontSize: '1.4rem',
              textTransform: 'unset',
              backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',

              '&:hover': {
                backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',
              },
              color: 'var(--fds-white)',
            }}
            disabled={chooses.length === 0}
            onClick={handleStartChat}
          >
            Bắt đầu cuộc trò chuyện
          </Button>
        </Box>
      }
    >
      <Body>
        <Box>
          <BiSearch />{' '}
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </Box>
        {chooses.length > 0 && (
          <ListChoose>
            {chooses.map((choose) => (
              <Box key={choose.id}>
                <Avatar src={choose.avatar} alt={choose.username} />
                <span>{choose.username}</span>
                <div
                  className="close"
                  onClick={() => {
                    setChooses((currentValue: User[]) => currentValue.filter((item) => item.id !== choose.id));
                  }}
                >
                  <IoCloseOutline />
                </div>
              </Box>
            ))}
          </ListChoose>
        )}
        <ListResult>
          {result && result.length > 0 ? (
            result.map((item) => (
              <ItemResult key={item.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={JSON.stringify(item)}
                      checked={isChecked(item.id)}
                      onChange={(e) => {
                        const value: User = JSON.parse(e.target.value);
                        const valueExist = chooses.find((choose) => choose.id === value.id);
                        if (valueExist) {
                          setChooses((currentValue: User[]) => currentValue.filter((item) => item.id !== valueExist.id));
                        } else {
                          setChooses((currentValue: User[]) => [...currentValue, value]);
                        }
                      }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  }
                  label={
                    <>
                      <Avatar src={item.avatar} alt={item.username} />
                      <h3>{item.username}</h3>
                    </>
                  }
                />
              </ItemResult>
            ))
          ) : (
            <p className="no-result">Không tìm thấy kết quả</p>
          )}
        </ListResult>
      </Body>
    </ModalWrapper>
  );
};

export default React.memo(ModalCreateConversation);
