import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <NavLink to="/" activeStyle={{textDecoration: "none"}}>
        <img className="logo-img" 
             src="/img/nebula_01_white_text.svg" 
             alt="project quickview" 
             width="110"/>
        {/* <h1>{props.header}</h1> */}
      </NavLink>
    </header>
  );
}

export default Header;
