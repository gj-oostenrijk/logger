import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUserAuth,
    currentUserData,
    updateUsersEmail,
    updateUsersPassword,
    updateFirstName,
    updateLastName,
  } = useUserContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (firstNameRef.current.value !== currentUserData?.firstName) {
      promises.push(updateFirstName(firstNameRef.current.value));
    }

    if (lastNameRef.current.value !== currentUserData?.lastName) {
      promises.push(updateLastName(lastNameRef.current.value));
    }

    if (emailRef.current.value !== currentUserAuth.email) {
      promises.push(updateUsersEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUsersPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate('/profile');
      })
      .catch(() => {
        setError('Failed to update account');
      });
    return setLoading(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  ref={firstNameRef}
                  defaultValue={currentUserData?.firstName}
                />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lastNameRef}
                  defaultValue={currentUserData?.lastName}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUserAuth.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </Container>
  );
}
