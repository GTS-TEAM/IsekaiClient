import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';

export const StyledCreatePost = styled.div`
  background-color: var(--fds-white);
  padding: 1.6rem;
  padding-bottom: 1rem;
  border-radius: var(--borderRadius2);
  box-shadow: var(--boxShadow1);
  border: 1px solid var(--fds-gray-4);
`;

export const Header = styled.div`
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #dad8d8;
`;

export const InputDummy = styled.div`
  width: 100%;
  flex: 1;
  padding: 0.7rem 1.6rem;
  border-radius: var(--borderRadius3);
  border: 1px solid var(--fds-gray-4);
  background-color: var(--grayColor1);
  font-size: 1.6rem;
  color: var(--textColorGray);
  cursor: text;

  p {
    line-height: 1.6;
    color: var(--fds-gray-8);
  }
`;

export const Bottom = styled.div`
  padding-top: 1.6rem;
`;

export const Action = styled(Button)`
  column-gap: 1rem;
  padding: 0.8rem 1.6rem;
  color: var(--fds-gray-5);
  background-color: var(--fds-gray-6);
  font-size: 1.4rem;
  text-transform: unset;
  border-radius: 500px;
  overflow: hidden;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
