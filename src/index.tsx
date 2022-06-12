import { Global } from '@emotion/react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import App from 'App';
import { AudioProvider } from 'context/audioContext';
import { globalStyles } from 'GlobalStyle';
import moment from 'moment';
import localization from 'moment/locale/vi';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store';

moment.updateLocale('vi', localization);

ReactDOM.render(
  <Provider store={store}>
    {/* @ts-ignore */}
    <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={'vi'}>
        <AudioProvider>
          <BrowserRouter>
            <Global styles={globalStyles} />
            <App />
          </BrowserRouter>
        </AudioProvider>
      </LocalizationProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
