import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'reducers/root';
import App from 'App';
import { ThemeProvider } from 'styled-components';
import { theme } from 'constants/styled-theme';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
