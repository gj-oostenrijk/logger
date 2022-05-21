import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useAllUsers } from '../api/databaseAPI';

export function UserCard({ user }) {
  return (
    <Card body>
      <Card.Text>
        <strong>{user.firstName}</strong>
        <br />
        {user.firstName}, age {user.age}
        <br />
        Number of dumps: {user.stool ? Object.keys(user.stool).length : '0'}
      </Card.Text>
    </Card>
  );
}

export function ListOfUsers({ users }) {
  if (!users) {
    return <Card body>Loading...</Card>;
  }

  if (users.length === 0) {
    return <Card body>No users yet</Card>;
  }

  return users.map((user) => {
    return <UserCard key={user.uid} user={user} />;
  });
}

function Users() {
  const users = useAllUsers();

  return (
    <Row>
      <Col>
        <h3>Our proud users: </h3>
        <ListOfUsers users={users} />
      </Col>
    </Row>
  );
}

export default Users;
