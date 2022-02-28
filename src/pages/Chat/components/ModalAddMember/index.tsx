import { Avatar, Box, Button, Checkbox, ClickAwayListener, FormControlLabel, IconButton } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import ModalWrapper from 'components/NewModal';
import { Header } from 'components/NewModal/styles';
import { addMember, chatSelector } from 'features/chatSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { User } from 'share/types';
import { Body, ItemResult, ListChoose, ListResult, StyledModal } from './styles';

const ModalAddMember: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ isShow, onClose }) => {
  const [result, setResult] = useState<User[] | null>(null);
  const [chooses, setChooses] = useState<User[]>([]);
  const { currentConversation } = useAppSelector(chatSelector);
  const dispatch = useAppDispatch();

  const handleSearch = async (text: string) => {
    const { data } = await isekaiApi.globalSearch(text);
    const newData = data.filter((item) => !currentConversation?.members.find((member: any) => member.user.id === item.id));
    setResult(newData);
  };
  const isChecked = (id: string) => {
    return chooses.some((choose: User) => choose.id === id);
  };

  useEffect(() => {
    const search = async () => {
      const { data } = await isekaiApi.globalSearch('');
      // tim thay tk member co cai id giong voi cai data search lay ra nhung dua khac
      const newData = data.filter((item) => !currentConversation?.members.find((member: any) => member.user.id === item.id));
      setResult(newData.slice(0, 10));
    };
    search();
  }, [currentConversation]);

  return isShow ? (
    <ModalWrapper>
      <ClickAwayListener onClickAway={onClose}>
        <StyledModal>
          <Header>
            <h3>Thêm thành viên</h3>
            <IconButton onClick={onClose}>
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
              onClick={() => {
                const membersId = chooses.map((choose) => choose.id);
                dispatch(addMember({ membersId, conversationId: currentConversation?.id }));
                onClose();
              }}
            >
              Thêm thành viên
            </Button>
          </Body>
        </StyledModal>
      </ClickAwayListener>
    </ModalWrapper>
  ) : null;
};

export default ModalAddMember;
