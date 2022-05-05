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
    weekday: 'long', 
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
          bristolStoolScale: child.val().bristolStoolScale
        });
      });
      setStoolList(items);
    });
  };

  function writeStoolData(userId, timestamp, bristolStoolScale) {
    set(ref(db, 'users/' + userId + '/stool/' + timestamp), {
      bristolStoolScale: bristolStoolScale
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
    const bristolStoolScale = inputBristol;

    if ( selectedUser !== gertJanUserId || isPwdPassageAllowed) {
        writeStoolData(selectedUser, timestamp, bristolStoolScale);
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
          <Form.Label>Select a user</Form.Label>
          <Form.Select 
            defaultValue={testUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value={testUser}>{testUser}</option>
            <option value={gertJanUserId}>{gertJanUserId}</option>
            <option value={"ome-niall"}>ome-niall</option>
          </Form.Select>
          <br/>
          { selectedUser === gertJanUserId && 
          <>
            <Form.Label htmlFor="inputPasswordStoolLogger">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPasswordStoolLogger"
              onChange={(e) => setInputPwd(e.target.value)}
            />
          </>
          }
          <br/>
          <Form.Label>Bristol Stool Scale: {inputBristol}</Form.Label>
          <Form.Range 
            min={1}
            max={7}
            step={1}
            defaultValue={inputBristol}
            onChange={(e) => setInputBristol(e.target.value)}
          />
          <Button 
            disabled={ selectedUser === gertJanUserId && !isPwdPassageAllowed }
            variant="primary" 
            onClick={addStoolButtonClick} >
            Log a new visit
          </Button>
          <br />
          <br />
          <Button 
            onClick={(e) => setShowImage(!showImage)} 
            variant="light"
          >{!showImage ? "Show" : "Hide"} Bristol Stool Chart image</Button>
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
            return <div key={key} ><FormattedDate date ={stoolItem.date} /></div>;
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