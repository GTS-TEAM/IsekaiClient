import { Global } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import App from 'App';
import { globalStyles } from 'GlobalStyle';
import moment from 'moment';
import localization from 'moment/locale/vi';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

moment.updateLocale('vi', localization);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <BrowserRouter>
          <Global styles={globalStyles} />
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
