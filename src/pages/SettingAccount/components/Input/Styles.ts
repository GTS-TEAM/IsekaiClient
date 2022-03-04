import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface PropsInputField {
  isFocus: boolean;
  isError: any;
}

export const StyledInputFiled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const InputFieldWrap = styled.div<PropsInputField>`
  border: 1px solid var(--fds-gray-12);
  border-radius: 6px;
  padding: 1.2rem;
  width: 100%;
  transition: all 0.3s ease;

  ${(p) =>
    p.isFocus
      ? css`
          background: #fff;
          box-shadow: -1px 3px 10px 0 rgb(0 0 0 / 6%);
          border-color: #e3e3e3;

          svg {
            color: var(--mainColor);
          }
        `
      : null}

  ${(p) =>
    p.isError
      ? css`
          border-color: red;

          label {
            color: red;
          }

          svg {
            color: red;
          }
        `
      : null}
`;

export const Label = styled.label`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: var(--fds-gray-1);
  margin-bottom: 1.2rem;
  display: block;
  font-weight: 500;
`;

export const Control = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  svg {
    width: 1.7rem;
    height: 1.7rem;
    color: #cecece;
    transition: color 0.3s ease;
  }
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  font-size: 1.4rem;
  color: var(--fds-gray-13);

  &::placeholder {
    color: #9b9b9b;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1.3rem;
  color: red;
`;
