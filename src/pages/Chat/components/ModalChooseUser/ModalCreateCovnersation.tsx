import { Avatar, Box, Button, Checkbox, ClickAwayListener, FormControlLabel, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { authSelector } from 'features/authSlice';
import { addConversation, chatSelector, createGroup, selectConversation, unmountMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ConversationItem, ConversationType, Member, User } from 'share/types';
import { compareTwoArrMember } from 'utils/compareTwoArrMember';
import { v4 as uuidv4 } from 'uuid';
import { Body, ItemResult, ListChoose, ListResult, StyledModal } from './styles';

const ModalCreateConversation: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ isShow, onClose }) => {
  const [result, setResult] = useState<User[] | null>(null);
  const [chooses, setChooses] = useState<User[]>([]);
  const { currentConversation, conversations, removedConversations } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(authSelector);
  const navigation = useNavigate();

  const handleSearch = async (text: string) => {
    const { data } = await isekaiApi.globalSearch(text);
    setResult(data);
  };
  const isChecked = (id: string) => {
    return chooses.some((choose: User) => choose.id === id);
  };

  const handleStartChat = () => {
    // const currentMember=
    if (chooses.length >= 2) {
      const isCan = conversations.some((conversation) => {
        return compareTwoArrMember(conversation.members as Member[], [...chooses, currentUser as User]);
      });
      const conversationExist = conversations.find((conversation) =>
        compareTwoArrMember(conversation.members as Member[], [...chooses, currentUser as User]),
      );

      if (!isCan) {
        const choosesId: string[] = chooses.map((choose: any) => choose.id);
        dispatch(createGroup(choosesId));
        navigation(`/message/${conversationExist?.id}`);
        dispatch(unmountMessage());
      } else {
        navigation(`/message/${conversationExist?.id}`);
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

  return isShow ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={closeHandler}>
        <StyledModal>
          <Header>
            <h3>Tạo cuộc trò chuyện</h3>
            <IconButton onClick={closeHandler}>
              <GrFormClose />
            </IconButton>
          </Header>
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
            <Button
              sx={{
                backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',

                '&:hover': {
                  backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',
                },
              }}
              disabled={chooses.length === 0}
              onClick={handleStartChat}
            >
              Bắt đầu cuộc trò chuyện
            </Button>
          </Body>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default React.memo(ModalCreateConversation);
