import { createMuiTheme } from '@material-ui/core/styles';

export const appTheme = createMuiTheme({
  palette: {
    primary: { main: '#27AAE1', contrastText: '#FFFFFF' },
    secondary: { main: '#c63fc4' },
    error: { main: '#ED1C24' },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '"Open Sans"',
      '"Segoe UI"',
      '-apple-system',
      'BlinkMacSystemFont',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
