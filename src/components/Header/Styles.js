import styled from '@emotion/styled';
import { Menu } from '@mui/material';

export const DropdownMenu = styled(Menu)`
  .MuiPaper-root {
    width: 100%;
    max-width: 36rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.8rem;
    border-radius: var(--borderRadius);
  }

  .MuiList-root {
    padding: 0;
  }

  .MuiMenuItem-root {
    column-gap: 1rem;
    padding: 0.8rem;
    border-radius: var(--borderRadius);

    .icon {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--textColorBlack);
      border-radius: 50%;
      background-color: #e4e6eb;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      color: var(--textColorGray);
      font-size: 1.3rem;
    }

    .text-1 {
      color: var(--textColorGray);
      font-size: 1.4rem;
      font-weight: 600;
    }

    .text .name {
      font-weight: 600;
      font-size: 1.6rem;
    }
  }

  .dropdown-header {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--borderColor);
  }

  .dropdown-list {
    padding-top: 0.8rem;
  }
`;
