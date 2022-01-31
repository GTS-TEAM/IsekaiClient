import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { Stack } from '@mui/material';

export const StyledActions = styled(Stack)`
  --col: 3;
  --gap: 0.5rem;
  border-top: 1px solid var(--fds-gray-4);
  border-bottom: 1px solid var(--fds-gray-4);
  padding: 0.5rem 0;
  gap: var(--gap);
  margin-right: calc(-1 * var(--gap));
  flex-direction: row;

  .like,
  .comment,
  .share {
    width: calc(100% / var(--col) - var(--gap));
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 500;
    column-gap: 1rem;
    cursor: pointer;
    color: var(--fds-gray-5);
    padding: 1rem;
    border-radius: var(--borderRadius1);
    transition: all 0.3s ease;

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }

    &:hover {
      background-color: var(--fds-gray-6);
    }
  }
`;