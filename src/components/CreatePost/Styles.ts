import styled from '@emotion/styled/macro';

export const StyledCreatePost = styled.div`
  background-color: var(--fds-white);
  padding: 1.6rem;
  border-radius: var(--borderRadius2);
  box-shadow: var(--boxShadow1);
  border: 1px solid var(--fds-gray-4);
`;

export const Header = styled.div`
  padding-bottom: 1.6rem;
`;

export const InputDummy = styled.div`
  width: 100%;
  flex: 1;
  padding: 0.7rem 1.6rem;
  border-radius: var(--borderRadius3);
  border: 1px solid var(--fds-gray-4);
  background-color: var(--grayColor1);
  font-size: 1.6rem;
  color: var(--textColorGray);
  cursor: text;

  p {
    line-height: 1.6;
    color: var(--fds-gray-8);
  }
`;

export const Actions = styled.div`
  padding: 1.6rem 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-top: 1px solid var(--fds-gray-4);

  .MuiButton-root {
    min-height: 3.2rem;
    border-radius: 500px;
    font-size: 1.2rem;
    gap: 8px;
    background-color: var(--fds-gray-6);
    color: var(--fds-gray-3);

    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;
