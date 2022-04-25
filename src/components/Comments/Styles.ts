import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';
import InputComment from 'components/InputComment/InputComment';

export const StyledComments = styled.div`
  padding: 0.5rem 1.8rem;
  position: relative;
  border-top: 1px solid var(--fds-gray-4);
`;

export const StyledListComments = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
`;

export const Bottom = styled(Stack)`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--fds-gray-5);

  span:first-of-type {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const StyledInputComment = styled(InputComment)`
  padding: 1rem 0;
  margin: 0;
  height: 6rem;
`;

export const StyledComment = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 1.4rem;
  overflow-x: hidden;

  & > div:first-of-type {
    flex-shrink: 0;
  }
`;

export const CommentMain = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: var(--borderRadius3);
  background-color: var(--grayColor1);

  .info {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  .info .name {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--textColorBlack);
  }

  .info .created_at {
    color: var(--textColorGray);
  }

  .content {
    font-size: 1.3rem;
    color: var(--textColorGray);
    max-width: 30rem;
    white-space: normal;
    word-break: break-all;
    white-space: pre-line;
  }
`;
