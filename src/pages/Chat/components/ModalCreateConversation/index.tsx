import { Avatar, Box, Checkbox, ClickAwayListener, FormControlLabel, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { authSelector } from 'features/authSlice';
import { addConversation, chatSelector, createGroup, selectConversation, unmountMessage } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React, { useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { ConversationItem, ConversationType, User } from 'share/types';
import { compareTwoArrMember } from 'utils/compareTwoArrMember';
import { v4 as uuidv4 } from 'uuid';
import { ButtonStart, ListSearch, ModalBody, StyledModal } from './styles';

const Modal: React.FC<{ isOpen: boolean; onClose: () => any }> = ({ isOpen, onClose }) => {
  const [resultSearch, setResultSearch] = useState<User[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chooses, setChooses] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(authSelector);
  const { conversations: currentConversations, currentConversation } = useAppSelector(chatSelector);
  const navigation = useNavigate();

  const handleChangeTextHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length === 0) {
      setResultSearch(null);
      return;
    }
    const { data } = await isekaiApi.globalSearch(e.target.value);
    setResultSearch(data.filter((item) => item.id !== currentUser?.id));
  };

  const haveChecked = (id: any) => {
    return chooses.some((choose: any) => choose.id === id);
  };

  const handleStartChat = () => {
    // const currentMember=
    if (chooses.length >= 2) {
      const isCan = currentConversations.some((conversation) => {
        return compareTwoArrMember(conversation.members, [...chooses, currentUser]);
      });
      const conversationExist = currentConversations.find((conversation) =>
        compareTwoArrMember(conversation.members, [...chooses, currentUser]),
      );

      if (!isCan) {
        dispatch(unmountMessage());
        const choosesId: string[] = chooses.map((choose: any) => choose.id);
        dispatch(createGroup(choosesId));
        navigation(`/message/${conversationExist?.id}`);
      } else {
        navigation(`/message/${conversationExist?.id}`);
      }
    } else {
      const conversationExist = currentConversations.find(
        (conversation) =>
          conversation.id === `${currentUser?.id}-${chooses[0].id}` ||
          conversation.id === `${chooses[0].id}-${currentUser?.id}`,
      );
      console.log(conversationExist);
      if (conversationExist) {
        navigation(`/message/${conversationExist.id}`);
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
        dispatch(addConversation(newConversation));
        dispatch(selectConversation(newConversation));
        navigation(`/message/${currentUser?.id}-${chooses[0].id}`);
      }
    }
    onClose();
    setChooses([]);
  };

  return isOpen ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal>
          <Header>
            <h3>Cuộc trò chuyện mới</h3>
            <IconButton onClick={onClose}>
              <GrFormClose />
            </IconButton>
          </Header>
          <ModalBody colorTheme={currentConversation?.theme}>
            <IMG.Bubbles />
            <Box className="input-field">
              <div className="icon">
                <BiSearch />
              </div>
              <input type="text" placeholder="Tìm kiếm..." onChange={handleChangeTextHandler} ref={inputRef} />
              {resultSearch && resultSearch.length > 0 && (
                <ClickAwayListener
                  onClickAway={() => {
                    setResultSearch(null);
                  }}
                >
                  <ListSearch>
                    {resultSearch.map((item) => (
                      <FormControlLabel
                        key={item.id}
                        label={
                          <Box>
                            <Avatar src={item.avatar} />
                            <h3>{item.username}</h3>
                          </Box>
                        }
                        control={
                          <Checkbox
                            value={JSON.stringify(item)}
                            checked={haveChecked(item.id)}
                            onChange={(e) => {
                              const value: User = JSON.parse(e.target.value);
                              const valueExist: User = chooses.find((choose: User) => choose.id === value.id);
                              if (valueExist) {
                                setChooses((currentValue: User[]) =>
                                  currentValue.filter((item) => item.id !== valueExist.id),
                                );
                              } else {
                                setChooses((currentValue: User[]) => [...currentValue, value]);
                              }
                            }}
                          />
                        }
                      />
                    ))}
                  </ListSearch>
                </ClickAwayListener>
              )}
            </Box>

            <p>Chọn một người dùng để bắt đầu một cuộc trò chuyện mới.</p>
            <ButtonStart disabled={chooses.length === 0} onClick={handleStartChat}>
              Bắt đầu cuộc trò chuyện
            </ButtonStart>
          </ModalBody>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default Modal;
