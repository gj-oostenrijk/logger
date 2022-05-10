import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const TopNavigation = () => {
  const { currentUser } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Logger App
        </Navbar.Brand>
        {currentUser && (
          <Navbar.Text as={NavLink} to="/profile" className="pull-right">
            <Badge>Logged in: {currentUser.email}</Badge>
          </Navbar.Text>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/profile">
              My Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              User Management
            </Nav.Link>
            <Nav.Link as={NavLink} to="/action/3.3">
              Something new
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
