import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import { StyledEngineProvider } from '@mui/material';
import moment from 'moment';
import localization from 'moment/locale/vi';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.scss';
import { persistor, store } from './store';
moment.updateLocale('vi', localization);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <App />
        </LocalizationProvider>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
