import styled from '@emotion/styled/macro';
import { fadeIn } from './../../utils/keyframeStyle';

export const StyledChat = styled.div`
  height: calc(100vh - var(--headerHeight));
  min-height: unset;
  overflow: hidden;
`;

export const ChatBody = styled.div`
  background-color: #f0f0f0;
  display: flex;
  height: 100%;

  & > .MuiBox-root:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    animation: ${fadeIn} 0.3s ease;

    & > p {
      font-size: 2.4rem;
      color: var(--fds-gray-7);
      text-align: center;
      padding: 0 1.2rem;
    }
  }
`;
