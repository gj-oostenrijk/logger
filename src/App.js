import React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import { AuthProvider } from './context/AuthContext';
import TopNavigation from './components/TopNavigation';

function App() {
  return (
    <AuthProvider>
      <TopNavigation />
      <Container className='mt-4' id="bodyWrapper">
        <Outlet />
      </Container>
      <Container><footer className="py-3 mt-3 text-muted border-top">© 2022</footer></Container>
    </AuthProvider>
  );
}

export default App;
