import styled from '@emotion/styled';
import { motion } from 'framer-motion';
export const StyledModal = styled(motion.div)`
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  z-index: 110;
  position: fixed;
  top: 50%;
  left: 50%;
  overflow: hidden;
`;
