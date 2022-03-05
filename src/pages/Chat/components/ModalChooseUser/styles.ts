import styled from '@emotion/styled/macro';
import { Modal } from 'components/NewModal/styles';
export const StyledModal = styled(Modal)`
  max-width: 55rem;
`;

export const Body = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  & > .MuiBox-root {
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    width: 100%;
    padding: 1.2rem;
    border: 1px solid var(--fds-gray-4);
    border-radius: var(--borderRadius2);
    font-size: 1.4rem;
    color: var(--fds-gray-8);

    input {
      width: 100%;
      flex: 1;
      font-size: 1.4rem;
      color: var(--fds-gray-8);
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: #cecece;
    }
  }

  .MuiButton-root {
    padding: 1.2rem;
    font-size: 1.4rem;
    text-transform: unset;
    color: var(--fds-white);
    border-radius: var(--borderRadius);
  }
`;

export const ListChoose = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  flex-wrap: wrap;

  .MuiBox-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;
    position: relative;
  }

  .close {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: -2px;
    background-color: var(--fds-white);
    border-radius: 50%;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    cursor: pointer;
  }
`;

export const ListResult = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: 32rem;
  min-height: 32rem;
  overflow-y: auto;

  .no-result {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export const ItemResult = styled.li`
  padding: 0;
  border-radius: var(--borderRadius);
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .MuiFormControlLabel-root {
    margin: 0;
    padding: 1.2rem;
    flex-direction: row-reverse;
    width: 100%;
  }

  .MuiCheckbox-root {
    flex-shrink: 0;
  }

  .MuiTypography-root {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
  }
`;
