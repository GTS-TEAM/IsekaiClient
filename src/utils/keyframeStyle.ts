import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
from {
   opacity: 0;
 }

 to {
   opacity: 1;
 }
`;

export const zoomInModal = keyframes`
  from {
    opacity: 0;
   transform:scale(0) ;
  

  }

  to {
    transform:scale(1) ;
    opacity: 1;
    
  }
`;
