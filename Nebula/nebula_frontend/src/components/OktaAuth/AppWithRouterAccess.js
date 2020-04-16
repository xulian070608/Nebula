import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "../HomePage/Home";
import { Login } from "./Login";
import Protected from "./Protected";
import Header from "../Header";
import ProjectOverview from "../PropertyInfo/ProjectOverview";
import PropertyLayout from "../PropertyLayout/PropertyLayout";
import Room from "../PropertyLayout/Room";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <Security
      issuer="https://dev-717659.okta.com/oauth2/default"
      clientId="0oa95v4l4EThrEGaA4x6"
      redirectUri={window.location.origin + "/implicit/callback"}
      onAuthRequired={onAuthRequired}
      pkce={true}
    >
      <Header header="Nebula" />
      <div className="content-offset" />
      <Switch>
        <Route path="/" exact component={Home} />
        <SecureRoute path="/protected" component={Protected} />
        <SecureRoute
          exact
          path="/:projectID/summary"
          render={(props) => {
            let pageID = props.location.pathname
              .replace("/summary", "")
              .replace("/", "");
            return <ProjectOverview projectID={pageID} />;
          }}
        />
        <SecureRoute
          exact
          path="/:projectID/planview"
          render={(props) => {
            let pageID = props.location.pathname
              .replace("/planview", "")
              .replace("/", "");
            return <PropertyLayout projectID={pageID} />;
          }}
        />
        <SecureRoute
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
