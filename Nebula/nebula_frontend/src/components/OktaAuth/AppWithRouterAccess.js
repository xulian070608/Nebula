import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Security, LoginCallback, AuthService } from "@okta/okta-react";

// local components
import Home from "../../pages/Home";
import { Login } from "./Login";
import Protected from "./Protected";
import { Header } from "../Header/";
import ProjectOverview from "../../pages/ProjectOverview/";
import PropertyLayout from "../../pages/FloorLayout/";
import Room from "../../pages/FloorLayout/Room";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  const authService = new AuthService({
    issuer: "https://dev-717659.okta.com/oauth2/default",
    clientId: "0oaagwt0lG8jUJqix4x6",
    redirectUri: window.location.origin + "/implicit/callback",
    onAuthRequired: onAuthRequired,
    pkce: true,
    scope: ["openid", "email", "profile", "phone", "address", "groups"],
  });

  return (
    <Security authService={authService}>
      <Header header="Nebula" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/protected" component={Protected} />
        <Route
          exact
          path="/:projectID/summary"
          render={(props) => {
            let pageID = props.location.pathname
              .replace("/summary", "")
              .replace("/", "");
            return <ProjectOverview projectID={pageID} />;
          }}
        />
        <Route
          exact
          path="/:projectID/planview"
          render={(props) => {
            let pageID = props.location.pathname
              .replace("/planview", "")
              .replace("/", "");
            return <PropertyLayout projectID={pageID} />;
          }}
        />
        <Route
          exact
          path="/:roomID/spaceInfo"
          render={(props) => {
            let pageID = props.location.pathname
              .replace("/spaceInfo", "")
              .replace("/", "");
            return <Room buildingNameRoomNumber={pageID} />;
          }}
        />
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
