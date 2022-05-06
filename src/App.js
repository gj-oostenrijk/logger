import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Logger App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/users">User Management</Nav.Link>
              <Nav.Link as={NavLink} to="/action/3.3">Something new</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className='mt-4' id="bodyWrapper">
        <Outlet />
      </Container>
      <Container><footer className="py-3 mt-3 text-muted border-top">© 2022</footer></Container>
      
    </>
  );
}

export default App;
