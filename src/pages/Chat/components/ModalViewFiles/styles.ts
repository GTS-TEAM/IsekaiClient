import styled from '@emotion/styled/macro';

export const Body = styled.div``;

export const TabWrapper = styled.div`
  overflow-x: hidden;
`;

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
  --col: 3;
  --gap: 1.2rem;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap);
  /* margin-right: calc(-1 * var(--gap)); */
  max-height: 55rem;
  min-height: 55rem;
  overflow-y: auto;

  .file-media {
    width: calc(100% / var(--col) - var(--gap));
    border-radius: var(--borderRadius2);
    overflow: hidden;
  }
`;

export const SectionMedia = styled.div`
  --col: 3;
  --gap: 1.2rem;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap);
  /* margin-right: calc(-1 * var(--gap)); */
  max-height: 55rem;
  min-height: 55rem;
  overflow-y: auto;

  .file-media {
    width: calc(100% / var(--col) - var(--gap));
    border-radius: var(--borderRadius2);
    overflow: hidden;
  }
`;

export const SectionFile = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  max-height: 55rem;
  min-height: 55rem;
  overflow-y: auto;
  padding: 1.2rem;
`;
