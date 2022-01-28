import styled from '@emotion/styled';

export const StyledListComments = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 6rem;
`;

export const LoadMore = styled.span`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
