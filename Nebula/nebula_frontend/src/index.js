// third party packages
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// local components
import AppWithRouterAccess from "./okta-auth/AppWithRouterAccess";

ReactDOM.render(
  <Router>
    <AppWithRouterAccess />
  </Router>,
  document.getElementById("root")
);
