import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
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
  const [stoolList, setStoolList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(testUser);
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
    const bristolStoolScale = 99;

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
        <br/>
        <br/>
        <br/>
      </div>
      <Row>
        <Col>
          <Row>
            <Col>
              <Form.Select 
                defaultValue={testUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value={testUser}>{testUser}</option>
                <option value={gertJanUserId}>{gertJanUserId}</option>
                <option value={"ome-niall"}>ome-niall</option>
              </Form.Select>
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
            </Col>
            <Col>
              <Button 
                // disabled={ selectedUser === gertJanUserId && !isPwdPassageAllowed }
                variant="primary" 
                onClick={addStoolButtonClick} >
                Log a new visit
              </Button>
            </Col>
          </Row>
        </Col>
        <Col><h3>{selectedUser}'s log</h3>
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