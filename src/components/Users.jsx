import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { db } from '../utils/firebase-config';
import { ref, set, onValue } from "firebase/database";



const Users = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAge, setNewAge] = useState(0);

    const getAllUsers = () => {
        onValue(ref(db, "users/"), (snapshot) => {
            let items = [];
            snapshot.forEach((child) => {
                items.push({
                    username: child.key,
                    ...child.val()
                })
            });
            console.log(items);
            setUsers(items);
        });
    };

    function writeUserData(userId, name, email, age) {
        set(ref(db, 'users/' + userId), {
            firstName: name,
            email: email,
            age : age
        });
    }

    const createUser = () => {
        writeUserData(Math.random().toString(36).slice(2, 7), newName, newEmail, newAge);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <Row>
            <Col>
                <br/ >
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
                    <Button disabled variant="primary" type="submit" onClick={createUser}>
                    Submit
                    </Button>
                </Form>
            </Col>
            <Col>
            <br/ >
            <h3>Our proud users</h3>
                {users ? 
                users.map((user, key) => {
                    return (
                        <Card body key={key}>
                            <Card.Text>
                                <strong>{user.username}</strong><br/>
                                {user.firstName}, age {user.age}
                            </Card.Text>
                        </Card>
                    )
                })
                : <div>Loading...</div> }
            </Col>
        </Row>
    );

};

export default Users;