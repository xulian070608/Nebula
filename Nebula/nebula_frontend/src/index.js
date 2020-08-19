// third party packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// local components
import AppWithRouterAccess from './okta-auth/AppWithRouterAccess';
import { nebulaTheme } from './utils/nebulaTheme';

// material ui components
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <ThemeProvider theme={nebulaTheme}>
    <CssBaseline />
    <Router>
      <AppWithRouterAccess />
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
