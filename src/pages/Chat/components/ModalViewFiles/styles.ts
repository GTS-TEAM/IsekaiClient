import styled from '@emotion/styled/macro';
import InfiniteScroll from 'react-infinite-scroll-component';

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

export const SectionMedia = styled(InfiniteScroll)`
  --col: 3;
  --gap: 1.2rem;
  padding: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--gap);
  align-content: flex-start;
  overflow-y: auto;
  width: 100%;

  p {
    color: var(--fds-gray-8);
    font-size: 1.4rem;
    text-align: center;
    width: 100%;
  }

  .file-media {
    width: calc(100% / var(--col) - var(--gap));
    border-radius: var(--borderRadius2);
    overflow: hidden;
  }

  @media screen and (max-width: 767.98px) {
    height: 30rem !important;
  }
`;

export const SectionFile = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  overflow-y: auto;
  padding: 1.2rem;
  align-content: flex-start;

  p {
    text-align: center;
    color: var(--fds-gray-8);
    font-size: 1.4rem;
  }

  @media screen and (max-width: 767.98px) {
    height: 30rem !important;
  }
`;
