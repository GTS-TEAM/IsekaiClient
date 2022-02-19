import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { fadeIn } from 'utils/keyframeStyle';

interface StyledFeaturesProps {
  left: boolean;
}
export const StyledFeatures = styled.div<StyledFeaturesProps>`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  animation: ${fadeIn} 1s ease;

  ${(p) =>
    p.left
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: row-reverse;
        `};
`;

export const ListEmotionReaction = styled.div<{ left: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  position: absolute;
  z-index: 3;
  background-color: var(--fds-white);
  padding: 0.5rem;
  border-radius: var(--borderRadius3);
  border: 1px solid var(--fds-gray-4);
  bottom: calc(100% + 0.5rem);
  animation: ${fadeIn} 1s ease;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);

  ${(p) =>
    !p.left
      ? css`
          left: 6.2rem;
        `
      : css`
          right: 6.2rem;
        `}

  .emoji {
    width: 2.8rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-10px) scale(1.2);
    }
  }
`;
