import styled from '@emotion/styled/macro';
import { IconButton } from '@mui/material';

export const StyledTypeMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 1.2rem;
  height: 6rem;
  padding: 0 1.6rem;
  background-color: var(--fds-white);
  border-top: 1px solid var(--fds-gray-4);
  position: relative;
`;

export const InputMessage = styled.div`
  background-color: var(--fds-white);
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
  border-radius: var(--borderRadius1);
  border: 1px solid #dbdbdb;
  padding: 0 1.2rem;

  input {
    width: 100%;
    flex: 1;
    font-size: 1.5rem;
    color: var(--fds-gray-8);

    &::placeholder {
      font-weight: 500;
    }
  }
`;

export const InputEmoji = styled(IconButton)`
  flex-shrink: 0;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--mainColor);
  }
`;

export const ButtonSend = styled(IconButton)`
  svg {
    width: 2.4rem;
    height: 2.4rem;
    width: 2.4rem;
    height: 2.4rem;
    color: var(--mainColor);
  }
`;

export const ButtonOpenMore = styled(IconButton)`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: var(--borderRadius1);
  background-color: var(--mainColor);

  &:hover {
    background-color: var(--mainColor);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--fds-white);
  }
`;
