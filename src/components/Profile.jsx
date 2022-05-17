import React, { useState } from 'react';
import {
  Button, Card, Alert, Container,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, currentUserData, logout } = useUserContext();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Name: </strong>
            {currentUserData?.firstName
              ? currentUserData.firstName
              : 'not set'}
            <br />
            <strong>Last name: </strong>
            {currentUserData?.lastName
              ? currentUserData.lastName
              : 'not set'}
            <br />
            <strong>Email: </strong>
            {currentUser.email}
            <br />
            <strong>Age: </strong>
            {currentUserData?.age ? currentUserData.age : 'not set'}
            <br />
            <strong>Number of dumps: </strong>
            {currentUserData?.stool
              ? Object.keys(currentUserData.stool).length
              : '0'}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </Container>
  );
}
