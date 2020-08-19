import { createMuiTheme } from '@material-ui/core/styles';

export const nebulaTheme = createMuiTheme({
  palette: {
    type: 'light',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#fe7303',
    },
    secondary: {
      main: '#ff0000',
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: '#3b4e63',
      },
    },
    MuiToolbar: {
      root: {
        justifyContent: 'space-between',
      },
    },
    MuiIconButton: {},
  },
});
