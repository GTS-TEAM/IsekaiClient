import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface PropsMessage {
  isSuccess: boolean;
}

export const Message = styled.p<PropsMessage>`
  padding: 1.2rem;
  border-radius: 6px;
  text-align: center;
  font-size: 1.4rem;
  max-width: 30rem;
  margin: 0 auto;

  ${(p) =>
    p.isSuccess
      ? css`
          color: #28a745;
          background-color: #c1f0cc;
        `
      : css`
          color: red;
          background-color: #f0c1c1;
        `}
`;
