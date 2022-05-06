import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase-config';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
            <Row>
                <h2>Firebase Auth</h2>
                <Col md={6}>
                    <h3>Create a User</h3>
                    <Form className='mb-3'>                        
                        <Row>
                            <Col>
                                <Form.Control 
                                    placeholder="Email..." 
                                    onChange={(e) => {
                                        setRegisterEmail(e.target.value);
                                    }}/>
                            </Col>
                            <Col>
                                <Form.Control 
                                    placeholder="Password..." 
                                    onChange={(e) => {
                                        setRegisterPassword(e.target.value);
                                    }}/>
                            </Col>
                            <Col>
                                <Button onClick={register}>Create User</Button>
                            </Col>
                        </Row>
                    </Form>
                    <h3>Login</h3>
                    <Form className='mb-3'>
                        <Row>
                            <Col>
                                <Form.Control 
                                    placeholder="Email..." 
                                    onChange={(e) => {
                                        setLoginEmail(e.target.value);
                                    }}/>
                            </Col>
                            <Col>
                                <Form.Control 
                                    placeholder="Password..." 
                                    onChange={(e) => {
                                        setLoginPassword(e.target.value);
                                    }}/>
                            </Col>
                            <Col>
                                <Button>Login</Button>
                            </Col>
                        </Row>
                    </Form>
                    <h4>User logged in: </h4>               
                    <span>{user ? user.email : ""}</span>
                    <Button onClick={logout}>Sign out</Button>
                </Col>
            </Row>
            <pre>
                {registerEmail}<br />
                {registerPassword}<br />
                {loginEmail}<br/>
                {loginPassword}
            </pre>
        </>
    );
};

export default Login;
