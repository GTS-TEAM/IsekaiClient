import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';

export const StyledPhotosPreview = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderPhotosPreview = styled(Stack)`
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  border: 1px solid var(--fds-gray-4);
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  margin-bottom: 1.2rem;
`;

export const ImgPreviewList = styled(Stack)`
  --col: 3;
  --gap: 1.2rem;
  flex-wrap: wrap;
  flex-direction: row;
  margin-right: calc(-1 * var(--gap));
  gap: var(--gap);
`;

export const ImgPreview = styled.div`
  width: calc(100% / var(--col) - var(--gap));
  height: 13rem;
  border-radius: var(--borderRadius1);
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
