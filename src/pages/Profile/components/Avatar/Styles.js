import styled from '@emotion/styled/macro';
import { Avatar, Button } from '@mui/material';

export const AvatarWrap = styled.div`
  position: absolute;
  left: 50%;
  bottom: -5.5rem;
  transform: translateX(-50%);
  z-index: 2;
`;

export const AvatarUser = styled(Avatar)`
  box-shadow: 0px 15px 32px rgb(0 0 0 / 18%);
`;

export const ButtonPropUp = styled(Button)`
  width: 3.8rem;
  height: 3.8rem;
  padding: 0;
  min-width: unset;
  border-radius: 50%;
  position: absolute;
  background-color: var(--mainColor) !important;
  color: var(--fds-white);
  bottom: 0;
  right: 0;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: inherit;
    transition: all 0.3s;
  }
`;
