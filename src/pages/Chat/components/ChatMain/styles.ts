import styled from '@emotion/styled';

export const StyledChatMain = styled.div<{
  height?: string;
}>`
  display: flex;
  flex-direction: column-reverse;
  /* justify-content: flex-end; */
  padding: 1.2rem;
  column-gap: 1.2rem;
  height: ${(p) => (p.height ? p.height : 'calc(100vh - 3 * 6rem)')};
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f0f2f5;

  .MuiCircularProgress-root {
    align-self: center;
    width: 3.6rem !important;
    height: 3.6rem !important;
  }
`;

export const EndChat = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 1.2rem;
  h3 {
    color: var(--fds-gray-9);

    font-size: 1.6rem;
    font-weight: 500;
  }

  span {
    font-size: 1.2rem;
    color: var(--fds-gray-7);
  }
`;
