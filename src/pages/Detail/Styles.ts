import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100vw;
  height: 100vh;
  background-color: var(--fds-white);
`;

export const SlideImgPostWrap = styled.div`
  width: 100%;
  max-width: 1080px;

  .swiper {
    height: 100vh !important;
  }
`;

export const Post = styled.div`
  flex: 1;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  padding: 1.2rem;
`;

export const Description = styled.p`
  color: var(--fds-gray-7);
  font-size: 1.4rem;
`;

export const ButtonAddFriend = styled(Button)`
  background-color: var(--fds-gray);
  border-radius: var(--borderRadius2);
  height: 3.5rem;
  width: 100%;
  max-width: 10rem;
  flex-shrink: 0;
  padding: 0;
  font-size: 1.4rem;
  color: var(--fds-gray-1);
  text-transform: unset;
  border: 1px solid var(--fds-gray-2);
`;

export const ButtonClose = styled(Button)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 1.6rem;
  top: 1.6rem;
  z-index: 10;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--fds-white) !important;
  min-width: unset;
  color: unset;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const CommentsArea = styled.div``;
