import { IconButton, MenuItem, Stack } from '@mui/material';
import { getDataWeather, setCoords, weatherSelector } from 'features/weatherSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import moment from 'moment';
import React, { useEffect } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import { capitalizeFirstLetter } from 'utils/capitalizeFirstLetter';
import { v4 as uuidv4 } from 'uuid';
import {
  Body,
  CurrentDay,
  DayForecast,
  Detail,
  Forecasts,
  Header,
  Loading,
  Location,
  StyledMenu,
  StyledWeather,
  Temperature,
} from './Styles';

const days = ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN'];

const Weather = () => {
  const { currentWeather, loading } = useAppSelector(weatherSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickToChangeLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(setCoords({ lat: coords.latitude, lon: coords.longitude }));
        dispatch(getDataWeather());
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    handleClose();
  };

  const clickToRefreshWeather = () => {
    dispatch(getDataWeather());
    handleClose();
  };

  useEffect(() => {
    dispatch(getDataWeather());
  }, [dispatch]);

  return (
    <StyledWeather style={{ backgroundImage: `url('${IMG.BgWeather}')` }}>
      <Header>
        <IconButton onClick={handleClick}>
          <BsThreeDotsVertical />
        </IconButton>
        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={clickToChangeLocation}>
            <IoLocationOutline />
            <Stack>
              <span className="main-text">Vị trí của bạn</span>
              <span className="desc">Thay đổi để hiển thị thời tiết ở nơi bạn ở.</span>
            </Stack>
          </MenuItem>
          <MenuItem onClick={clickToRefreshWeather}>
            <AiOutlineReload />
            <Stack>
              <span className="main-text">Làm mới</span>
              <span className="desc">Cập nhật thời tiết mới nhất.</span>
            </Stack>
          </MenuItem>
        </StyledMenu>
      </Header>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Body>
          <Temperature>
            <span>{currentWeather && Math.round(currentWeather.current.temp)}</span>
          </Temperature>
          <Detail>
            <div className="icon">
              <img src={`https://openweathermap.org/img/wn/${currentWeather?.current.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className="status">
              {currentWeather && capitalizeFirstLetter(currentWeather.current.weather[0].description)}
            </div>
            <Stack flexDirection="row" alignItems="center" columnGap="1.6rem">
              <div className="real-feel">
                Cảm giác như: {currentWeather && Math.round(currentWeather?.current.feels_like)}°
              </div>
              <div className="humidity">Độ ẩm: {currentWeather?.current.humidity}%</div>
            </Stack>
            <Forecasts>
              {currentWeather &&
                currentWeather.daily.map((item) => (
                  <DayForecast key={uuidv4()}>
                    <div className="day-of-week">{days[new Date(item.dt * 1000).getDay()]}</div>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
                    <div className="temp">{Math.round(item.temp.day)}°</div>
                  </DayForecast>
                ))}
            </Forecasts>
            <CurrentDay>{moment(new Date()).format('LLL')}</CurrentDay>
            <Location>
              <IoLocationOutline />
              <span>
                {currentWeather?.locationName}, {currentWeather?.country}
              </span>
            </Location>
          </Detail>
        </Body>
      )}
    </StyledWeather>
  );
};

export default React.memo(Weather);
