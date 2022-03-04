import styled from '@emotion/styled/macro';

export const Body = styled.div``;

export const TabWrapper = styled.div``;

export const TabHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--fds-gray-4);
`;

export const Tab = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--fds-gray-10);
  padding: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-of-type {
    border-right: 1px solid var(--fds-gray-4);
  }

  &:hover {
    background-color: #dbdbdb;
  }
`;

export const TabContent = styled.div`
  padding: 1.2rem;
`;
