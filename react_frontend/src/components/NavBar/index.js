import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavBarElements';
  
  const Navbar = () => {
    return (
      <>
        <Nav>
          <NavLink to='/'>
            <img src={require('../../logo.svg')} alt='Melodice' />
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLink to='/play' activeStyle>
              Play
            </NavLink>
            <NavLink to='/learn' activeStyle>
              Learn
            </NavLink>
            <NavLink to='/overview' activeStyle>
              Explore
            </NavLink>
            <NavLink to='/search' activeStyle>
              Search
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn>
            <NavBtnLink to='/signin'>Log In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
  
  export default Navbar;