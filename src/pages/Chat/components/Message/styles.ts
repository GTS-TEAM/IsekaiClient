import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';

interface StyledMessageProps {
  timeCreated: number | string | null;
}

export const StyledMessage = styled.div<StyledMessageProps>`
  font-size: 1.4rem;
  font-weight: 500;
  border-radius: var(--borderRadius);
  padding: 1.2rem;
  background-color: var(--mainColor);
  color: var(--fds-white);
  position: relative;
  max-width: 50rem;
  line-height: 1.5;

  &::before {
    content: '';
    background-color: inherit;
    position: absolute;
    clip-path: polygon(0 0, 0 100%, 100% 50%);
    width: 1rem;
    height: 1rem;
    top: 50%;
  }

  &::after {
    content: '${(p) => p.timeCreated}';
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

interface MessageStyledProps {
  left: boolean;
}
export const MessageWrapStyled = styled.div<MessageStyledProps>`
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
  position: relative;

  .features {
    opacity: 0;
    visibility: hidden;
  }

  &:hover .features {
    opacity: 1;
    visibility: visible;
  }

  ${(p) =>
    p.left
      ? css`
          flex-direction: row;
          justify-content: flex-end;
        `
      : css`
          flex-direction: row-reverse;
          justify-content: flex-end;
        `}

  ${(p) =>
    !p.left
      ? css`
          ${StyledMessage} {
            margin-left: 1rem;
            &::before {
              transform: translateY(-50%) rotate(-180deg);
              right: calc(100% - 0.5px);
            }
            &::after {
              left: calc(100% + 1.2rem);
              z-index: 2;
            }
          }
        `
      : css`
          ${StyledMessage} {
            margin-right: 1rem;
            &::before {
              transform: translateY(-50%) rotate(0);
              left: calc(100% - 0.5px);
            }
            &::after {
              right: calc(100% + 1.2rem);
              z-index: 2;
            }
          }
        `}
`;
