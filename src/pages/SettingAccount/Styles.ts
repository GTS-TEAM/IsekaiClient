import styled from '@emotion/styled';
import { Button, Stack } from '@mui/material';

export const StyledSettingAccount = styled.div`
  padding: 1.8rem;
`;

export const SettingAccountContainer = styled.div`
  padding: 3rem;
  border-radius: 6px;
  border: 1px solid var(--fds-gray-12);
  background-color: var(--fds-white);
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--fds-gray-9);
  margin-bottom: 2rem;
`;

export const FormWrap = styled(Stack)`
  flex-direction: row;

  form {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .form-text {
    color: #64668a;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  .date-picker {
    font-size: 1rem;
  }
`;

export const Illustration = styled.div`
  padding: 0 15rem;
  display: flex;
  flex-direction: column;
  row-gap: 2.4rem;

  svg {
    width: 100%;
    max-width: 20rem;
  }

  p {
    max-width: 20rem;
    line-height: 1.5;
    font-size: 1.2rem;
  }

  p span {
    color: var(--mainColor);
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ButtonSaveChange = styled(Button)`
  border-radius: 6px;
  background-color: var(--mainColor);
  color: var(--fds-white);
  font-size: 1.4rem;
  height: 4.4rem;
  min-width: 16rem;
  align-self: flex-start;

  &:hover {
    background-color: var(--mainColor);
  }

  &:disabled {
    color: var(--fds-white) !important;
  }
`;
