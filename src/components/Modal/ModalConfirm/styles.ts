import styled from '@emotion/styled/macro';
import { Modal } from 'components/Modal/ModalWrapper/Styles';

export const StyledModal = styled(Modal)`
  max-width: 55rem;
`;

export const Body = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  p {
    font-size: 1.4rem;
    color: var(--fds-gray-10);
    line-height: 1.5;
  }

  .MuiBox-root {
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    align-self: flex-end;

    .MuiButton-root {
      padding: 0.8rem 2rem;
      border-radius: var(--borderRadius2);
      text-transform: unset;
      font-size: 1.4rem;
      color: var(--fds-white);
    }
  }
`;
