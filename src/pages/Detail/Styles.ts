import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const StyledDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100vw;
  height: calc(100vh - 60px);
  background-color: var(--fds-white);
  margin-top: 6rem;
`;

export const SlideImgPostWrap = styled.div`
  width: 100%;
  max-width: 1080px;

  .swiper {
    height: calc(100vh - 60px) !important;
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

export const ButtonClose = styled(Button)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 1.6rem;
  top: calc(1.6rem + 6rem);
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

export const StyledDetailNoImg = styled.div``;
