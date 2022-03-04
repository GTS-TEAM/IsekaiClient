import styled from '@emotion/styled/macro';
import { Button } from '@mui/material';
import { Modal } from 'components/NewModal/styles';

export const StyledModal = styled(Modal)`
  width: 100%;
  width: 55rem;
`;

export const ButtonStart = styled(Button)`
  align-self: center;
  background-color: var(--mainColor);
  color: var(--fds-white);
  text-transform: unset;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;

  &:hover {
    background-color: var(--mainColor);
  }
`;

export const ModalBody = styled.div<{
  colorTheme: string;
}>`
  padding: 0.8rem 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  svg {
    max-width: 7rem;
    height: 7rem;
    margin: 0 auto;

    .theme {
      fill: ${(p) => p.colorTheme || 'var(--mainColor)'};
    }
  }

  .input-field {
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: var(--borderRadius2);
    margin: 0 5rem;
    position: relative;

    .icon {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon svg {
      width: 2rem;
      height: 2rem;
      color: #cecece;
    }

    input {
      width: 100%;
      flex: 1;
      padding-right: 1.6rem;
      font-size: 1.4rem;
      color: var(--fds-gray-8);
    }
  }

  p {
    text-align: center;
    font-size: 1.4rem;
    color: var(--fds-gray-1);
    line-height: 1.5;
    margin: 0 5rem;
  }

  ${ButtonStart} {
    background-color: ${(p) => p.colorTheme || 'var(--mainColor)'};
  }
`;

export const ListSearch = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--fds-white);
  z-index: 100;
  top: calc(100% + 1.2rem);
  overflow-y: auto;
  padding: 1.2rem;
  border-radius: var(--borderRadius2);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  max-height: 32rem;
  min-height: 32rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }

  .MuiFormControlLabel-root {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;

    column-gap: 1.2rem;
    cursor: pointer;
    margin: 0;

    .MuiBox-root {
      display: flex;
      align-items: center;
      column-gap: 1.2rem;
    }
  }
`;
