import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { db } from '../utils/firebase-config';
import { ref, set, onValue } from "firebase/database";
// import styled from 'styled-components'
import cryptoJs from 'crypto-js';

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
  const [stoolList, setStoolList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(testUser);
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
      console.log(items);
      setStoolList(items);
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
      <div className="jumbotron">
        <h1 className="display-4">De logger!</h1>
        <p className="lead">Een simpel tooltje waarbij jij elk <em>"bezoek"</em> kan loggen ;)))</p>
        <br />
        <br />
      </div>
      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Select a user</Form.Label>
            <Form.Select 
              defaultValue={testUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value={testUser}>{testUser}</option>
              <option value={gertJanUserId}>{gertJanUserId}</option>
              <option value={"ome-niall"}>ome-niall</option>
            </Form.Select>
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
          <br />
          <br />
          <br />
          <br />
          <Button 
            onClick={(e) => setShowImage(!showImage)} 
            variant="light"
          >{!showImage ? "Show" : "Hide"} Bristol Stool Scale image</Button>
          { showImage && 
          <Image 
            fluid
            rounded
            src={process.env.PUBLIC_URL+"/assets/img/bristol.png"} 
            alt="bristol stool chart"
            />
          }       
        </Col>
        <Col lg={6}><h3>{selectedUser}'s log</h3>
          {stoolList ? stoolList.map((stoolItem, key) => {
            return <div key={key} ><FormattedDate date ={stoolItem.date} />, kwaliteit: {stoolItem.bristolStoolScale}, comment: {stoolItem.comment}</div>;
          })
          : "Loading.."}
        </Col>
      </Row>
      <Row>
        <Col>
          <br/>
          <br/>
          <br/>
        </Col>
      </Row>
    </>
  );
  
};

export default Stool;