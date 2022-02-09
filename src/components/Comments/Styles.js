import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';

export const StyledListComments = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 6rem;
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
