import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material';
import { persistor, store } from './store';
import App from './App';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import moment from 'moment';
import localization from 'moment/locale/vi';
moment.updateLocale('vi', localization);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
