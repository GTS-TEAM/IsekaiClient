import styled from '@emotion/styled/macro';
import { fadeIn } from 'utils/keyframeStyle';

export const StyledEmoji = styled.div`
  position: absolute;
  bottom: calc(100% + 1.2rem);
  right: 0;
  .emoji-picker-react {
    border: 1px solid var(--fds-gray-4);
    box-shadow: unset;
  }

  .emoji-scroll-wrapper {
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  animation: ${fadeIn} 0.35s ease;
`;
