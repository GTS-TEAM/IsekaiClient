import styled from '@emotion/styled/macro';
import { Modal } from 'components/Modal/styles';

export const StyledModal = styled(Modal)`
  max-width: 55rem;
`;

export const Body = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  input {
    width: 100%;
    padding: 1.5rem;
    border: 1px solid var(--fds-gray-4);
    border-radius: var(--borderRadius2);
    font-size: 1.4rem;
    color: var(--fds-gray-8);
  }

  .MuiBox-root {
    align-self: flex-end;
    display: flex;
    column-gap: 1.2rem;
  }

  .MuiButton-root {
    padding: 0.8rem 2rem;
    border-radius: var(--borderRadius2);
    text-transform: unset;
    font-size: 1.4rem;
    color: var(--fds-white);

    &.cancel {
      background-color: #bdbdbd;

      &:hover {
        background-color: #bdbdbd;
      }
    }

    /* &:hover{
        
    } */
  }
`;
