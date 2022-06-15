import styled from '@emotion/styled';

export const StyledHeader = styled.div`
  background-image: linear-gradient(0deg, #121212 40%, var(--mainColor) 100%);
  padding: 0 1.6rem;

  h1 {
    font-size: 2.4rem;
    padding: 1.6rem 0;
    text-align: center;
  }

  .img {
    width: 20rem;
    height: 20rem;
    margin: 0 auto;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-action {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 50%;
    background-color: var(--mainColor);
    cursor: pointer;

    svg {
      width: 2.4rem;
      height: 2.4rem;
      fill: var(--fds-white);
    }
  }
`;
