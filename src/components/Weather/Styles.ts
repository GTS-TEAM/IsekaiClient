import styled from '@emotion/styled';
import { Menu } from '@mui/material';

export const StyledWeather = styled.div`
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--mainColor);
  padding: 1.6rem;
  border-radius: var(--borderRadius2);
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  color: var(--fds-white);
  font-size: 1.4rem;
  text-align: center;
  line-height: 1.5;
  font-weight: 500;
  min-height: 50rem;
  position: relative;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  .MuiButtonBase-root {
    height: 3.2rem;
    width: 3.2rem;
    padding: 0;
    margin-left: auto;
    color: var(--fds-white);
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
`;

export const Temperature = styled.div`
  font-size: 5rem;
  font-weight: 600;

  span {
    position: relative;
  }

  span::after {
    content: '';
    position: absolute;
    top: 4px;
    right: -18px;
    height: 14px;
    width: 14px;
    border: 3px solid #fff;
    border-radius: 50%;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;

  .icon {
    width: 10rem;
    height: 10rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .status {
    font-size: 2.4rem;
  }
`;

export const Forecasts = styled.div`
  --col: 7;
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: var(--borderRadius);
`;

export const DayForecast = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CurrentDay = styled.div``;

export const Location = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: var(--borderRadius1);
    border: 1px solid var(--fds-gray-4);
    box-shadow: none;
  }

  .MuiMenuItem-root {
    padding: 0.8rem 1.6rem;
    column-gap: 1.6rem;

    svg {
      width: 1.8rem;
      height: 1.8rem;
      color: #757a91;
      transition: all 0.3s;
    }

    .main-text {
      font-size: 1.4rem;
      color: var(--fds-gray-9);
      font-weight: 500;
      transition: all 0.3s;
    }

    .desc {
      font-size: 1.2rem;
      color: #a2a5b9;
    }

    &:hover {
      .main-text,
      svg {
        color: var(--mainColor);
      }
    }
  }
`;

export const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 2.4rem;
`;
