import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Clock from './components/Clock';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Logger App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item><Nav.Link as={NavLink} to="/stool">Stool logger</Nav.Link></NavDropdown.Item>
                <NavDropdown.Item><Nav.Link as={NavLink} to="/users">User Management</Nav.Link></NavDropdown.Item>
                <NavDropdown.Item><Nav.Link as={NavLink} to="/action/3.3">Something</Nav.Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Nav.Link as={NavLink} to="/action/3.4">Separated link</Nav.Link></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Clock />
        </Container>
      </Navbar>
      <Container id='bodyWrapper'>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
