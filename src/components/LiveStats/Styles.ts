import styled from '@emotion/styled/macro';
import { Box, Stack } from '@mui/material';
import { User } from 'share/types';

export const StyledLiveStats = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 1rem;
  font-size: 1.4rem;
  color: var(--fds-gray-3);

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  & > span {
    margin-left: auto;
  }
`;

export const LikerGroup = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  height: 3.4rem;
  .MuiAvatar-root {
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
  }
`;

interface propUser {
  userLiked: User[];
}

export const LikerText = styled(Stack)<propUser>`
  line-height: 1.5;

  a {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--fds-gray-9);

    &:not(:last-child)::after {
      content: ',  ';
      margin-right: 0.3rem;
    }
  }

  .showUserLiked {
    position: relative;
    span {
      width: fit-content;
      height: ${(p) => (p.userLiked.length - 2 > 0 ? '2rem' : '')};
      :hover {
        border-bottom: 1px solid;
        cursor: pointer;
      }

      :hover + .hoverShowUserLike {
        display: flex;
      }
    }

    .hoverShowUserLike {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2rem;
      flex-direction: column;
      padding: 4px;
      display: none;
      border-radius: 0.5rem;

      span {
        color: white;
        padding: 4px;
        height: fit-content;
        width: 15rem;
      }
    }
  }
`;

export const StyleMdLiked = styled(Box)<propUser>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  width: 530px;
  outline: none;
  height: fit-content;

  .topMdLiked {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid gray;
  }

  h3 {
    padding: 1rem;
  }

  .MuiList-root {
    height: ${(p) => (p.userLiked.length - 6 > 0 ? '40rem' : 'fit-content')};
    width: 500px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    margin-right: 1rem;

    .MuiAvatar-root {
      margin: 1rem;
    }
  }

  .PoShowLiked {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .showLiLiked {
      display: flex;
      align-items: center;
    }
  }
`;

export const UserPreview = styled.div`
  position: absolute;
  width: 30rem;
  padding: 1.2rem;
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  z-index: 100;
  bottom: calc(100% + 1.5rem);
  left: 50%;
  transform: translateX(-50%);
  display: none;
  flex-direction: column;
  row-gap: 1.2rem;

  .img {
    height: 10rem;
    position: relative;
  }

  .bg-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-img {
    position: absolute;
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 50%;
    right: 1.6rem;
    bottom: -2rem;
    box-sizing: content-box;
    border: 2px solid var(--fds-white);
  }

  .username {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--fds-gray-9);
  }

  .bio {
    font-size: 1.3rem;
  }

  .message {
    margin-left: auto;
    cursor: pointer;
  }

  &::after {
    content: '';
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    background-color: inherit;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1.5rem;
    top: 100%;
    left: 0;
    right: 0;
    background-color: transparent;
  }
`;

export const StyledUserLiked = styled.div`
  position: relative;

  &:hover ${UserPreview} {
    display: flex;
  }
`;

export const AvatarWrap = styled.div`
  margin-left: -0.8rem;

  .MuiAvatar-root {
    overflow: unset;
  }

  .MuiAvatar-root img {
    border-radius: 50%;
  }
`;
