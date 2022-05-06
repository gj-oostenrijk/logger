import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { db } from '../utils/firebase-config';
import { ref, set, onValue } from "firebase/database";
// import styled from 'styled-components'
import cryptoJs from 'crypto-js';
import Jumbotron from '../components/Jumbotron';

function FormattedDate({date}) {
  let options = { 
    weekday: 'short', 
    year: 'numeric',
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit',
    minute:'2-digit'
  };
  return <span>{date.toLocaleString('nl-NL', options)}</span>;
}

function encryptString (text) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
};

const Stool = () => {
  const testUser = "testUser";
  const gertJanUserId = "gj-oostenrijk";
  const hashedKey = "Z2VycmUgZ2VycmU="; 
  const [showImage, setShowImage] = useState(false);
  const [stoolList, setStoolList] = useState();
  const [selectedUser, setSelectedUser] = useState(testUser);
  const [users, setUsers] = useState();
  const [inputBristol, setInputBristol] = useState(3);
  const [inputComment, setInputComment] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [isPwdPassageAllowed, setIsPwdPassageAllowed] = useState(false);

  const getStoolListForUser = (userId) => {
    const dbRef = ref(db, "users/" + userId + "/stool/");

    onValue(dbRef, (snapshot) => {
      let items = [];
      snapshot.forEach((child) => {
        items.push({
          timestamp: child.key,
          date: new Date (child.key * 1000),
          ...child.val()
        });
      });
      setStoolList(items);
    });
  };

  const getAllUsers = () => {
    onValue(ref(db, "users/"), (snapshot) => {
        let items = [];
        snapshot.forEach((child) => {
            items.push({
                username: child.key,
                ...child.val()
            })
        });
        setUsers(items);
    });
};

  function writeStoolData(userId, timestamp, bristolStoolScale, comment) {
    set(ref(db, 'users/' + userId + '/stool/' + timestamp), {
      bristolStoolScale: bristolStoolScale,
      comment: comment
    });
  }

  useEffect(() => { 
    getStoolListForUser(selectedUser);
    validatePassage();
  }, [selectedUser]);

  useEffect(() => { 
    validatePassage();
  }, [inputPwd]);

  useEffect(() => { 
    getAllUsers();
  }, []);


  function addStoolButtonClick (e) {
    const timestamp = Math.floor(Date.now() / 1000);

    if ( selectedUser !== gertJanUserId || isPwdPassageAllowed) {
        writeStoolData(selectedUser, timestamp, inputBristol, inputComment );
        setInputComment("");
    } 
  }

  function validatePassage() {
    setIsPwdPassageAllowed( selectedUser !== gertJanUserId || validatePwd(inputPwd));
  }

  function validatePwd(pwd) {
    console.log(encryptString(pwd) === hashedKey);
    return encryptString(pwd) === hashedKey;
  }

  return (
    <>
      <Jumbotron />
      <Row className='row align-items-md-stretch'>
        <Col md={6} >
          <div className='h-100 p-5 text-white bg-dark rounded-3'>
          <h3>Add a new log</h3>
            <Form.Group className="mb-3">
              <Form.Label>Select a user</Form.Label>
              { users  
                ? <Form.Select 
                  defaultValue={testUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  { users.map((user, key) => <option key={key} value={user.username}>{user.username}</option>) }
                </Form.Select>
                : <p><em>Loading users...</em></p>
              }
            </Form.Group>
            
            { selectedUser === gertJanUserId && 
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPasswordStoolLogger">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPasswordStoolLogger"
                onChange={(e) => setInputPwd(e.target.value)}
              />
            </Form.Group>
            }

            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputComment">Comment</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Any special remarks to this visit?"
                id="inputComment"
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bristol Stool Scale: {inputBristol}</Form.Label>
              <Form.Range 
                min={1}
                max={7}
                step={1}
                defaultValue={inputBristol}
                onChange={(e) => setInputBristol(e.target.value)}
              />
            </Form.Group>
            
            <Button 
              disabled={ selectedUser === gertJanUserId && !isPwdPassageAllowed }
              variant="primary" 
              onClick={addStoolButtonClick} >
              Log a new visit
            </Button>
            <br/>
            <br/>
            <br/>
            <Button 
              onClick={(e) => setShowImage(!showImage)} 
              variant="outline-secondary"
            >{!showImage ? "Show" : "Hide"} Bristol Stool Scale image</Button>
            { showImage && 
            <Image 
              fluid
              rounded
              src={process.env.PUBLIC_URL+"/assets/img/bristol.png"} 
              alt="bristol stool chart"
              />
            }       
          
          </div>
        </Col>
        <Col md={6}>
          <div className='h-100 p-5 bg-light border rounded-3'>
            <h3>{selectedUser}'s log</h3>
            {stoolList ? stoolList.map((stoolItem, key) => {
              return <div key={key} ><FormattedDate date ={stoolItem.date} />, kwaliteit: {stoolItem.bristolStoolScale}, comment: {stoolItem.comment}</div>;
            })
            : "Loading.."}
          </div>
        </Col>
      </Row>
    </>
  );
  
};

export default Stool;