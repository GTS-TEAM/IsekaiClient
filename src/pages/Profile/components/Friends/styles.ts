import styled from '@emotion/styled';

export const StyledFriends = styled.div`
  .header {
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem;
    border: 1px solid var(--fds-gray-4);
    background-color: var(--fds-white);
    border-radius: var(--borderRadius2);
    margin-bottom: 1.2rem;
    text-align: center;
  }

  .list {
    --col: 3;
    --gap: 1.2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-right: calc(-1 * var(--gap));
    gap: var(--gap);

    li {
      width: calc(100% / var(--col) - var(--gap));
    }

    li a {
      width: 100%;
      position: relative;
      display: block;
      padding-bottom: 100%;
    }

    .MuiAvatar-root {
      width: 100%;
      position: absolute;
      inset: 0;
      height: 100%;
      border-radius: var(--borderRadius1);
    }

    h4 {
      font-size: 1.4rem;
      margin-top: 0.8rem;
      text-align: center;
      color: var(--fds-gray-9);
    }
  }
`;
