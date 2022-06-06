import styled from '@emotion/styled/macro';

export const StyledListFriend = styled.div`
  background-color: var(--fds-white);
  padding: 1.6rem 1.6rem;
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

export const StyledFriend = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  cursor: pointer;
  padding: 1.2rem;
  border-radius: var(--borderRadius2);

  &:hover {
    background-color: rgb(250, 250, 250);
  }

  .infoFr {
    display: flex;
    flex-direction: column;

    span {
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 0.8rem;
    }
    .online {
      .timeFr {
        font-size: 1rem;
        color: gray;
      }
    }
  }
`;
