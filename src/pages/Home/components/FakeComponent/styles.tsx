import styled from '@emotion/styled/macro';

export const StyledFakeComponent = styled.div`
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);

  .header {
    padding: 1.6rem;
    font-size: 1.4rem;
    color: #757a91;
    border-bottom: 1px solid #e8e8e8;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding: 1.6rem 0;
  }

  .item {
    padding: 0.8rem 1.6rem;
  }

  .logo {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.6rem;
    flex-shrink: 0;
  }

  h5 {
    font-weight: 500;
    color: var(--fds-gray-9);
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }

  .sub-text {
    color: #757a91;
    font-size: 1.2rem;
  }

  .icon {
    margin-right: left;

    svg {
      stroke: #888da8;
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;
