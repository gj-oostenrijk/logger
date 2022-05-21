import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { db } from '../utils/firebase-config';

function Users() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    onValue(ref(db, 'users/'), (snapshot) => {
      const items = [];
      snapshot.forEach((child) => {
        items.push({
          ...child.val(),
        });
      });
      setUsers(items);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h3>Our proud users</h3>
          {users ? (
            users.map((user) => {
              return (
                <Card body key={user.firstName + user.lastName}>
                  <Card.Text>
                    <strong>{user.firstName}</strong>
                    <br />
                    {user.firstName}, age {user.age}
                    <br />
                    Number of dumps:{' '}
                    {user.stool ? Object.keys(user.stool).length : '0'}
                  </Card.Text>
                </Card>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
      {/* <Login /> */}
    </>
  );
}

export default Users;
