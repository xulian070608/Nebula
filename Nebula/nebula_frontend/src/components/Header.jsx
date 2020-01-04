import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <NavLink to="/" activeStyle={{textDecoration: "none"}}>
        <h1>{props.header}</h1>
      </NavLink>
    </header>
  );
}

export default Header;
