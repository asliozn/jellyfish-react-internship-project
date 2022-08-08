import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom'
import logo from "./images/jellyfish_logo.png";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: '#6963AD'
};

const Navbarjelly = () => {
    return (
      <>
    <Navbar bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="/home"><img src={logo} width={100} height={50} alt='Logo' /></Navbar.Brand>
          <Nav className="justify-content-center" >
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/login" style={linkStyle}>Sign In</Link>
            <Link to="/register" style={linkStyle}>Sign Up</Link>
            <Link to="/editor" style={linkStyle}>New Article</Link>
            <Link to="/settings" style={linkStyle}>Settings</Link>
            <Link to="/profile" style={linkStyle}>Profile</Link>


          </Nav>
        </Container>
      </Navbar>
      </>
    );
}

export default Navbarjelly;