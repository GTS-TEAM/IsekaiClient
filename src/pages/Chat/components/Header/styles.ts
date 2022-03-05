import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';

export const StyledHeader = styled.div<{ borderRadius?: string }>`
  background-color: var(--fds-white);
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  border-bottom: 1px solid var(--fds-gray-4);
  border-radius: ${(p) => p.borderRadius || null};
  position: relative;
  flex-shrink: 0;
`;

export const RecipientBox = styled(Box)<{ popup: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;

  ${(p) =>
    p.popup
      ? css`
          cursor: pointer;
          padding: 0.5rem 1rem;
          margin-left: -1rem;
          border-radius: var(--borderRadius2);
          &:hover {
            background-color: #fafafa;
          }
        `
      : undefined}

  .MuiBox-root {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    h3 {
      font-weight: 500;
      color: var(--fds-gray-7);
      font-size: 1.6rem;
    }

    span {
      color: var(--fds-gray-3);
      font-size: 1.4rem;
    }
  }
`;

export const StyledButtonIcon = styled(IconButton)`
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #a2a5b9;
  }
`;
