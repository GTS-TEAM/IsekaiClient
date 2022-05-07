import styled from '@emotion/styled';

export const StyledList = styled.ul`
  --col: 5;
  --gap: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  margin-right: calc(-1 * var(--gap));

  li {
    width: calc(100% / var(--col) - var(--gap));
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .avatar {
    position: relative;
    padding-bottom: 100%;

    &-inner {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .MuiAvatar-root {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      font-size: 2.4rem;
    }
  }

  h4 {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--fds-gray-9);
  }
  button {
    background-color: var(--mainColor);
    color: var(--fds-white);
    font-size: 1.4rem;
    text-transform: unset;
    width: 100%;

    &:hover {
      background-color: var(--mainColor);
    }
  }
`;
