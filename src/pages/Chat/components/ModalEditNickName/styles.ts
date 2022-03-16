import styled from '@emotion/styled/macro';
import { Modal } from 'components/NewModal/styles';

export const StyledModal = styled(Modal)`
  max-width: 55rem;
`;

export const Body = styled.div`
  padding: 1.2rem 0;
`;

export const ListMember = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  cursor: pointer;
  color: var(--fds-gray-10);
  height: 7rem;
  padding: 0 1.2rem;
  &:hover {
    background-color: rgb(250, 250, 250);
  }

  .main-box,
  .input-field {
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    column-gap: 1.2rem;
  }

  .sub-box {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    flex: 1;

    h5 {
      font-size: 1.4rem;
      font-weight: 500;
    }

    span {
      font-size: 1.2rem;
    }
  }
  .input-field {
    position: relative;

    input {
      flex: 1;
      padding: 1.5rem;
      font-size: 1.4rem;
      color: inherit;
      border-radius: var(--borderRadius2);
      transition: border 0.3s ease;
      border: 1px solid transparent;
      font-weight: 500;

      &::placeholder {
        font-weight: 500;
        color: inherit;
      }

      &:focus {
        border: 1px solid var(--fds-gray-4);
      }
    }
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;
