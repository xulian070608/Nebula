import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, LoginCallback, AuthService } from '@okta/okta-react';

// local components
import { Home } from '../pages/Home/';
import { ProjectOverview } from '../pages/ProjectOverview/';
import { FloorLayout } from '../pages/FloorLayout/';
import Room from '../pages/FloorLayout/Room';
import { Login } from './Login';
import { Header } from '../components/Header/';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const authService = new AuthService({
    issuer: 'https://dev-717659.okta.com/oauth2/default',
    clientId: '0oaagwt0lG8jUJqix4x6',
    redirectUri: window.location.origin + '/implicit/callback',
    onAuthRequired: onAuthRequired,
    pkce: true,
    scope: ['openid', 'email', 'profile', 'phone', 'address', 'groups'],
  });

  return (
    <Security authService={authService}>
      <Header header="Nebula" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/project/:projectID" component={ProjectOverview} />
        <Route exact path="/planview/:projectID" component={FloorLayout} />
        <Route exact path="/spaceInfo/:roomID" component={Room} />
        <Route
          path="/login"
          render={() => (
            <Login issuer="https://dev-717659.okta.com/oauth2/default" />
          )}
        />
        <Route path="/implicit/callback" component={LoginCallback} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;
