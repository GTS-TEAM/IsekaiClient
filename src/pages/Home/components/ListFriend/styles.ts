import styled from '@emotion/styled/macro';

export const StyledListFriend = styled.div`
  background-color: var(--fds-white);
  padding: 1.6rem 1.6rem;
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  margin-bottom: 1.6rem;

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
  width: 100%;

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

  .add-friend {
    margin-left: auto;
  }
`;

export const Card = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-radius: var(--borderRadius2);
  box-shadow: none;
  color: #4a4a4a;
  max-width: 100%;
`;

export const CardHeading = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;

  h4 {
    font-size: 1.4rem;
    color: #757a91;
    font-weight: 400;
    text-transform: capitalize;
  }
`;

export const CardBody = styled.div`
  .add-friend-block {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
  }

  .page-meta {
    padding: 0 10px;
    line-height: 1.3;
    span {
      font-size: 1.3rem;
      color: #393a4f;
      font-weight: 500;
    }
  }
  .add-friend {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    margin-left: auto;
    border-radius: 50%;
    transition: all 0.3s;
    cursor: pointer;
    font-family: Roboto, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #344258;

    svg {
      width: 18px;
      height: 18px;
      stroke: #888da8;
      transition: all 0.3s;
    }
  }
`;
