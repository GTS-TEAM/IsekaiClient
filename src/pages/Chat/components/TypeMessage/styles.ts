import styled from '@emotion/styled/macro';
import { IconButton } from '@mui/material';

export const StyledTypeMessage = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  column-gap: 1.2rem;
  min-height: 6rem;
  padding: 1.2rem;
  background-color: var(--fds-white);
  border-top: 1px solid var(--fds-gray-4);
  position: relative;
  flex-shrink: 0;
`;

export const InputMessage = styled.div`
  background-color: var(--fds-white);
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
  flex: 1;
  width: 100%;
  position: relative;
  border-radius: var(--borderRadius1);
  border: 1px solid #dbdbdb;
  padding: 0.4rem 1rem;

  .MuiBox-root {
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
  }

  textarea {
    width: 100%;
    flex: 1;
    font-size: 1.5rem;
    color: var(--fds-gray-8);
    resize: none;
    overflow-y: auto !important;
    display: flex;
    height: 2rem !important;
    max-height: 12rem;

    &::placeholder {
      font-weight: 500;
      /* line-height: 4rem; */
    }
  }
`;

export const InputEmoji = styled(IconButton)`
  flex-shrink: 0;
  align-self: flex-end;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  svg {
    width: 2rem;
    height: 2rem;
    color: var(--mainColor);
  }
`;

export const ButtonSend = styled(IconButton)`
  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--mainColor);
  }
`;

export const ButtonOpenMore = styled(IconButton)`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: var(--borderRadius1);
  background-color: var(--mainColor);

  &:hover {
    background-color: var(--mainColor);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--fds-white);
  }
`;

export const ListFilesPreview = styled.ul`
  --gap: 1.2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap);

  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: var(--borderRadius2);
    flex-shrink: 0;
  }

  li {
    position: relative;
    flex-shrink: 0;
  }

  .MuiButtonBase-root {
    position: absolute;
    top: -1.5rem;
    right: -1.5rem;
    background-color: var(--fds-white);
    border: 1px solid var(--fds-gray-4);
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
    z-index: 2;
  }
`;

export const FilePreview = styled.div`
  min-height: 5.2rem;
  max-width: 12rem;
  padding: 1.2rem;
  border-radius: var(--borderRadius2);
  background-color: var(--fds-gray-2);
  display: flex;
  align-items: center;
  column-gap: 1rem;

  svg {
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    color: var(--fds-white);
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    color: var(--fds-white);
    font-size: 1.4rem;
    font-weight: 500;
  }
`;
