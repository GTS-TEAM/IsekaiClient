import styled from '@emotion/styled/macro';
import { Menu } from '@mui/material';

export const CoverOverLay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
`;

export const StyledCoverImg = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &:hover ${CoverOverLay} {
    opacity: 1;
    visibility: visible;
    z-index: 1;
  }
`;

export const BgCover = styled.img`
  min-height: 18rem;
  max-height: 32rem;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
`;

export const MenuFilter = styled.div`
  padding: 1rem 0;
  .menu-filter-item {
    height: 4.2rem;
    width: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const InputImgTrigger = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  cursor: pointer;
  height: 4rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  background-color: var(--fds-white);
  transition: all 0.3s;
  z-index: 2;

  .MuiButton-root {
    color: var(--fds-black);
    text-transform: unset;
    width: 100%;
    height: 100%;
    padding: 0 1.6rem;
    column-gap: 1rem;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  span {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const MenuChooseChangeBgCover = styled(Menu)`
  .MuiPaper-root {
    width: 100%;
    max-width: 30rem;
    border-radius: var(--borderRadius1);
    margin-top: 1rem;
  }

  .MuiMenuItem-root {
    column-gap: 1rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--fds-black);

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  z-index: 2;
  display: none;

  @media screen and (max-width: 1023.98px) {
    display: block;
  }

  .MuiButtonBase-root {
    width: 4rem;
    height: 4rem;
    background-color: var(--fds-white) !important;
    padding: 0;

    svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--fds-black);
    }
  }
`;

export const Dropdown = styled(Menu)`
  .MuiPaper-root {
    border-radius: 6px;
    margin-top: 1rem;
  }

  .MuiMenuItem-root {
    column-gap: 1rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--fds-black);

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;
