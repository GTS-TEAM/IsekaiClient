import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import { Modal } from 'components/Modal/styles';

export const StyledModalChangeTheme = styled(Modal)`
  max-width: 34rem;
  display: flex;
  flex-direction: column;
`;

export const ListTheme = styled.ul`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
`;

export const ThemeItem = styled.li`
  .MuiBox-root {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 3.2rem;
      height: 3.2rem;
      color: var(--fds-white);
    }
  }
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
  margin: 1.2rem;
  padding: 0.5rem 1.2rem;

  text-transform: unset;
  font-size: 1.4rem;
  color: var(--fds-white);
`;
