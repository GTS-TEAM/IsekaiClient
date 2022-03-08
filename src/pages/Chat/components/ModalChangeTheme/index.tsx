import { Box, ClickAwayListener, IconButton } from '@mui/material';
import { Header } from 'components/NewModal/styles';
import { chatSelector, updateConversation } from 'features/chatSlice';
import { StyledModalWrap } from 'GlobalStyle';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsCheck2 } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { themes } from 'utils/thems';
import { ListTheme, StyledButton, StyledModalChangeTheme, ThemeItem } from './styles';

const modal = document.querySelector('#modal') as Element;

const ModalChangeTheme: React.FC<{
  onClose: () => any;
  isShow: boolean;
}> = ({ onClose, isShow }) => {
  const { currentConversation } = useAppSelector(chatSelector);
  const [chooseColor, setChooseColor] = useState<string>('');
  const dispatch = useAppDispatch();
  return isShow
    ? createPortal(
        <StyledModalWrap>
          <ClickAwayListener onClickAway={onClose}>
            <StyledModalChangeTheme>
              <Header>
                <h3>Màu</h3>
                <IconButton onClick={onClose}>
                  <GrFormClose />
                </IconButton>
              </Header>
              <ListTheme>
                {themes.map((theme) => (
                  <ThemeItem
                    key={theme.color}
                    onClick={() => {
                      setChooseColor(theme.name);
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme.name,
                      }}
                    >
                      {chooseColor === theme.name && <BsCheck2 />}
                    </Box>
                  </ThemeItem>
                ))}
              </ListTheme>
              <StyledButton
                sx={{
                  backgroundColor: currentConversation?.theme || 'var(--mainColor)',

                  '&:hover': {
                    backgroundColor: currentConversation?.theme || 'var(--mainColor)',
                  },
                }}
                onClick={() => {
                  dispatch(
                    updateConversation({
                      conversationId: currentConversation?.id as string,
                      fields: {
                        theme: chooseColor,
                      },
                    }),
                  );
                  onClose();
                }}
                disabled={currentConversation?.theme === chooseColor}
              >
                Lưu
              </StyledButton>
            </StyledModalChangeTheme>
          </ClickAwayListener>
        </StyledModalWrap>,
        modal,
      )
    : null;
};

export default ModalChangeTheme;
