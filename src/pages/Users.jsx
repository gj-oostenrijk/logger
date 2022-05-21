import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../utils/firebase-config";
import { ref, set, onValue } from "firebase/database";
import Login from "../components/Login-3";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  function writeUserData(userId, name, age) {
    set(ref(db, "users/" + userId), {
      firstName: name,
      age: age,
    });
  }

  const createUser = () => {
    writeUserData(Math.random().toString(36).slice(2, 7), newName, newAge);
  };

  const getAllUsers = () => {
    onValue(ref(db, "users/"), (snapshot) => {
      let items = [];
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
        {/* <Col>
                    <h2>Add a new user</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUserName">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control type="text" placeholder="Your name" onChange={(event) => {setNewName(event.target.value)}} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUserAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Age" onChange={(event) => {setNewAge(event.target.value)}} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={createUser}>
                            Submit
                        </Button>
                    </Form>
                </Col> */}
        <Col>
          <h3>Our proud users</h3>
          {users ? (
            users.map((user, key) => {
              console.log(user);
              return (
                <Card body key={key}>
                  <Card.Text>
                    <strong>{user.firstName}</strong>
                    <br />
                    {user.firstName}, age {user.age}
                    <br />
                    Number of dumps:{" "}
                    {user.stool ? Object.keys(user.stool).length : "0"}
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
};

export default Users;
