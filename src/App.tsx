import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { store } from 'store';
import { appTheme } from 'config/theme';
import { getRoutes } from 'config/Routes';
import { queryClient } from 'config/query';

function App() {
  const routes = getRoutes();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MuiThemeProvider theme={appTheme}>
          <CssBaseline />
          <BrowserRouter>
            { routes }
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
