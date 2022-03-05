import styled from '@emotion/styled/macro';
import { DropdownMenu } from 'GlobalStyle';

export const StyledDropdownMenu = styled(DropdownMenu)`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  bottom: calc(100% + 1.2rem);

  .giphy-grid {
    max-height: 35rem;
    height: 35rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
    }

    .giphy-attribution {
      display: none;
    }
  }
`;
