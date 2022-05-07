import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { fadeIn } from 'utils/keyframeStyle';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  :root {
    --headerHeight: 6rem;
    --bgColor: #f0f2f5;
    --sidebarWidth: 24rem;
    --borderRadius: 4px;
    --borderRadius1: 10px;
    --borderRadius2: 13px;
    --borderRadius3: 20px;
    --textColorBlack: #000;
    --textColorWhite: #fff;
    --fds-black: #000000;
    --fds-black-1: #344258;
    --fds-gray-13: #5b5d7e;
    --fds-white: #fff;
    --fds-gray: #fcfcfc;
    --fds-gray-1: #999;
    --fds-gray-2: #b5b5b5;
    --fds-gray-3: #888da8;
    --fds-gray-4: #e8e8e8;
    --fds-gray-5: #6c6f73;
    --fds-gray-6: #f7f7f7;
    --fds-gray-7: #757a91;
    --fds-gray-8: #363636;
    --fds-gray-9: #393a4f;
    --fds-gray-10: #4a4a4a;
    --fds-gray-11: #cecece;
    --fds-gray-12: #e0e0e0;
    --textColorGray: #5a5a5a;
    --mainColor: #5596e6;
    --grayColor: #747474;
    --grayColor1: #f7f7f7;
    --borderColor: #e5e5e5;
    --shadow-1: rgba(0, 0, 0, 0.1);
    --shadow-2: rgba(0, 0, 0, 0.2);
    --shadow-5: rgba(0, 0, 0, 0.5);
    --shadow-8: rgba(0, 0, 0, 0.8);
    --shadow-inset: rgba(255, 255, 255, 0.5);
    --surface-background: #ffffff;
    --boxShadow-1: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    --boxShadow-2: 0 1px 2px var(--shadow-2);
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    -webkit-tap-highlight-color: transparent;
    line-height: 1;
    font-family: 'Roboto', sans-serif;
  }

  body {
    overflow-x: hidden;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  a {
    text-decoration: none;
    display: inline-block;
  }

  span {
    display: inline-block;
  }

  input,
  textarea,
  button {
    border: 0;
    outline: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button:disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  .toast {
    font-size: 1.6rem;
    font-weight: 500;
  }

  .layout {
    margin-top: var(--headerHeight);
    min-height: calc(100vh - var(--headerHeight));
    background-color: #f0f2f5;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1230px;
    padding: 0 1.5rem;
  }

  .MuiAlert-message {
    font-size: 1.4rem;
  }

  .MuiAlert-filledSuccess {
    background-color: rgb(56, 142, 60);
  }
`;

export const DropdownMenu = styled.div<{
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
}>`
  min-width: 28rem;
  position: absolute;
  top: ${(p) => p.top};
  bottom: ${(p) => p.bottom};
  left: ${(p) => p.left};
  right: ${(p) => p.right};
  z-index: 10;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  border: 1px solid var(--fds-gray-4);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  animation: ${fadeIn} 0.35s ease;
`;

export const DropdownContent = styled.div`
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #fafafa;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: #757a91;
  }

  .MuiBox-root {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    h3 {
      font-size: 1.4rem;
      color: var(--fds-gray-9);
    }

    span {
      font-size: 1.2rem;
      color: #a2a5b9;
      line-height: 1.2;
    }
  }
`;

export const StyledModalWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 0.3s ease;
`;
