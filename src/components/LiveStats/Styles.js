import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';

export const StyledLiveStats = styled(Stack)`
  flex-direction: row;
  padding: 1.2rem;
  column-gap: 1rem;
  font-size: 1.4rem;
  color: var(--fds-gray-3);

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  span {
    margin-left: auto;
  }
`;
