import styled from '@emotion/styled/macro';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';

export const StyledModal = styled(motion.div)`
  background-color: var(--fds-white);
  border-radius: var(--borderRadius2);
  z-index: 110;
  width: 100%;
  max-width: 72rem;
  border: 1px solid var(--fds-gray-4);
  transition: transform 0.1s ease;
  position: fixed;
`;

export const Header = styled(Stack)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2.8rem;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--fds-gray-10);
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;

  svg {
    color: var(--fds-gray-10);
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export const Body = styled.div`
  padding: 0 2.8rem 1.6rem 2.8rem;
`;

export const SelectionBox = styled.div`
  padding: 4rem;
  border: 1px solid var(--fds-gray-4);
  border-radius: var(--borderRadius);
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    display: block;
    max-height: 120px;
    margin: 0 auto;
    opacity: 0.5;
    transition: all 0.3s;
    filter: grayscale(1);
    margin-bottom: 1.2rem;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
  }

  span {
    font-weight: 500;
    color: var(--fds-gray-9);
    transition: color 0.3s;
    font-size: 1.6rem;
  }
`;

export const UploadBox = styled.div`
  width: 100%;
  height: 300px;
  padding: 40px;
  border: 3px dashed #e8e8e8;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    display: block;
    max-height: 110px;
    margin: 0 auto;
    opacity: 0.5;
    filter: grayscale(1);
    transition: all 0.3s;
    margin-bottom: 1.2rem;

    &:hover {
      opacity: 1;
      filter: grayscale(0);
    }
  }

  span {
    font-weight: 500;
    color: var(--fds-gray-9);
    transition: color 0.3s;
    font-size: 1.6rem;
  }
`;
