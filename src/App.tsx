import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { store } from 'store';
import { appTheme } from 'config/theme';
import { getRoutes } from 'config/Routes';

function App() {
  const routes = getRoutes();

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        <BrowserRouter>
          { routes }
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
