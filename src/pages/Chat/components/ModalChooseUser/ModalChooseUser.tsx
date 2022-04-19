import { Avatar, Box, Checkbox, FormControlLabel } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { ModalWrapper } from 'components/Modal';
import { addMember } from 'features/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { ConversationItem, Member, User } from 'share/types';
import { v4 as uuidv4 } from 'uuid';
import { Body, ItemResult, ListChoose, ListResult } from './styles';

const ModalChooseUser: React.FC<{
  onClose: () => any;
  currentConversation: ConversationItem;
}> = ({ onClose, currentConversation }) => {
  const [result, setResult] = useState<User[] | null>(null);
  const [chooses, setChooses] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  const handleSearch = async (text: string) => {
    const { data } = await isekaiApi.globalSearch(text);
    const newData = data.filter((item) => !currentConversation?.members?.find((member: any) => member.user.id === item.id));
    setResult(newData);
  };
  const isChecked = (id: string) => {
    return chooses.some((choose: User) => choose.id === id);
  };

  const handleAddMember = () => {
    const membersId = chooses.map((choose) => choose.id);
    const newMembers: Member[] = chooses.map((choose) => {
      return {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        nickname: null,
        role: 'member',
        deleted_conversation_at: null,
        user: {
          address: choose.address,
          avatar: choose.avatar,
          background: choose.background,
          bio: choose.bio as string,
          date: choose.date as string,
          id: choose.id,
          phone: choose.phone as string,
          roles: choose.roles as string,
          updated_at: new Date().toISOString(),
          username: choose.username,
          last_activity: null,
        },
      };
    });
    dispatch(addMember({ membersId, conversationId: currentConversation?.id as string, members: newMembers }));
    setChooses([]);
    onClose();
  };

  return (
    <ModalWrapper
      titleHeader="Thêm thành viên"
      textOk="Thêm thành viên "
      onOk={handleAddMember}
      onClose={onClose}
      propsButtonOk={{
        sx: {
          backgroundColor: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',

          '&:hover': {
            backgroundColor: currentConversation?.theme ? `${currentConversation?.theme} !important` : 'var(--mainColor)',
          },
          width: '100%',
        },
        disabled: chooses.length === 0,
      }}
      hiddenButtonCancel={true}
    >
      <Body>
        <Box>
          <BiSearch />
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
        {/* <Button
          sx={{
            backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',

            '&:hover': {
              backgroundColor: currentConversation?.theme ? currentConversation?.theme : 'var(--mainColor)',
            },
          }}
          disabled={chooses.length === 0}
          onClick={() => {
            const membersId = chooses.map((choose) => choose.id);
            const newMembers: Member[] = chooses.map((choose) => {
              return {
                id: uuidv4(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                nickname: null,
                role: 'member',
                deleted_conversation_at: null,
                user: {
                  address: choose.address,
                  avatar: choose.avatar,
                  background: choose.background,
                  bio: choose.bio as string,
                  date: choose.date as string,
                  id: choose.id,
                  phone: choose.phone as string,
                  roles: choose.roles as string,
                  updated_at: new Date().toISOString(),
                  username: choose.username,
                  last_activity: null,
                },
              };
            });
            dispatch(addMember({ membersId, conversationId: currentConversation?.id as string, members: newMembers }));
            setChooses([]);
            onClose();
          }}
        >
          Thêm thành viên
        </Button> */}
      </Body>
    </ModalWrapper>
  );
};

export default React.memo(ModalChooseUser);
