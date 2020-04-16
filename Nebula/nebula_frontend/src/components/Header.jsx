import React from "react";
import { NavLink } from "react-router-dom";

import { useOktaAuth } from "@okta/okta-react";

function Header(props) {
  const { authState, authService } = useOktaAuth();

  if (authState.isPending) {
    return <div>loading...</div>;
  }

  const button = authState.isAuthenticated ? (
    <button
      onClick={() => {
        authService.logout();
      }}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => {
        authService.login();
      }}
    >
      Login
    </button>
  );

  return (
    <header>
      <NavLink to="/" activeStyle={{ textDecoration: "none" }}>
        <img
          className="logo-img"
          src="/img/nebula_01_white_text.svg"
          alt="project quickview"
          width="110"
        />
        {/* <h1>{props.header}</h1> */}
      </NavLink>
      {button}
    </header>
  );
}

export default Header;
