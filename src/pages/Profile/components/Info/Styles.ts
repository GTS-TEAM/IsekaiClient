import styled from '@emotion/styled/macro';
import { Button, Stack } from '@mui/material';

export const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;

export const BioHeader = styled(Stack)`
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  border: 1px solid var(--fds-gray-4);
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
`;

export const Body = styled.div`
  padding: 1rem 1.6rem;
  border: 1px solid var(--fds-gray-4);
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  display: flex;
  flex-direction: column;
  text-align: center;
  row-gap: 1.2rem;
`;

export const InputEdit = styled.textarea`
  border: 1px solid var(--fds-gray-4);
`;

export const Text = styled.p`
  font-size: 1.4rem;
  color: var(--fds-gray-7);
`;

export const ButtonEdit = styled(Button)`
  width: 100%;
  padding: 0.8rem;
  border-radius: var(--borderRadius2);
  font-size: 1.4rem;
  text-transform: unset;
  background-color: var(--fds-gray-6);
  border: 1px solid var(--fds-gray-4);
  color: var(--fds-black-1);

  &:hover {
    background-color: var(--fds-gray-6) !important;
  }
`;

export const StyledInputBio = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  textarea {
    min-height: 8rem;
    width: 100%;
    resize: none !important;
    text-align: center;
    background-color: var(--fds-gray-6);
    padding: 1.2rem;
    font-size: 1.4rem;
    font-family: inherit;
    border-radius: var(--borderRadius2);
    border: 1px solid var(--fds-gray-4);

    &::placeholder {
      font-weight: 500;
    }
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    column-gap: 1.2rem;
    justify-content: flex-end;
  }

  button.save,
  button.cancel {
    padding: 0.4rem;
    border-radius: var(--borderRadius2);
    font-size: 1.4rem;
    text-transform: unset;
    background-color: var(--fds-gray-6);
    border: 1px solid var(--fds-gray-4);
    color: var(--fds-black-1);
  }
  button.save {
    background-color: var(--mainColor);
    color: var(--fds-white);
  }
`;
