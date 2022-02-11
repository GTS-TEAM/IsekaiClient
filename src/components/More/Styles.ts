import styled from '@emotion/styled';
import { MenuItem } from '@mui/material';

interface MoreProps {
  height: string;
  width: string;
  heightIcon: string;
  widthIcon: string;
}

export const StyledMore = styled.div<MoreProps>`
  align-self: center;

  .MuiButton-root {
    height: ${(p) => p.height};
    width: ${(p) => p.width};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    color: var(--textColorGray);
    background-color: var(--grayColor1);
    border-radius: 50%;
  }

  .MuiButton-root svg {
    height: ${(p) => p.heightIcon};
    width: ${(p) => p.widthIcon};
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;
  column-gap: 1.6rem;
  font-size: 1.3rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
