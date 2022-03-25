import styled from '@emotion/styled';
import { fadeIn } from 'utils/keyframeStyle';
export const StyledChatView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  animation: ${fadeIn} 0.3s ease;
`;
