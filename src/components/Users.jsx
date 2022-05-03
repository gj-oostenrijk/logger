import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { db } from '../utils/firebase-config';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";



const Users = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAge, setNewAge] = useState(0);

    const getAllUsers = () => {
        onValue(ref(db, "users/"), (snapshot) => {
            const data = snapshot.val();

            const usersArray = [];
            for (let i in data ) {
            usersArray.push(data[i]);
            }
            setUsers(usersArray);
            return usersArray;
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
            </Col>
            <Col>
                {users ? 
                users.map((user, key) => {
                    return (
                        <ul key={key}>
                            <li>Name: {user.firstName}</li>
                            <li>Age: {user.age}</li>
                        </ul>
                    )
                })
                : <div>Loading...</div> }
            </Col>
        </Row>
    );

};

export default Users;