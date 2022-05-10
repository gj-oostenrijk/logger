import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { UserProvider } from "./context/UserContext";
import TopNavigation from "./components/TopNavigation";

function App() {
  return (
    <UserProvider>
      <TopNavigation />
      <Container className="mt-4" id="bodyWrapper">
        <Outlet />
      </Container>
      <Container>
        <footer className="py-3 mt-3 text-muted border-top">© 2022</footer>
      </Container>
    </UserProvider>
  );
}

export default App;
