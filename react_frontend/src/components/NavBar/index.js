import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/play" activeStyle>
            Play
          </NavLink>
          <NavLink to="/overview" activeStyle>
            Explore
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
