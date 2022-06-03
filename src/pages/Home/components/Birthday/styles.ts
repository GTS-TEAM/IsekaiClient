import styled from '@emotion/styled';

export const StyledBirthday = styled.div`
  background-color: #45d7c4;
  border-radius: var(--borderRadius2);
  background-repeat: no-repeat;
  background-size: cover;

  .header {
    padding: 1.6rem;
    color: var(--fds-white);
  }

  .body {
    min-height: 29rem;
    padding: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--fds-white);
  }

  h4 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 1.4rem;
    text-align: center;
  }

  button {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    font-weight: 500;
    line-height: 0;
    margin: 16px 0;
    padding: 18px 22px;
    font-size: 1.4rem;
    border-radius: var(--borderRadius2);
    text-transform: unset;
  }
`;
