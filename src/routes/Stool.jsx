import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase-config';
import { ref, set, onValue, child, get } from "firebase/database";

import '../App.css';

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

const Stool = () => {
  const [stoolList, setStoolList] = useState([]);

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
    getStoolListForUser("gj-oostenrijk");
  }, []);


  const addStoolButtonClick = () => {
    const userId = "gj-oostenrijk";
    const timestamp = Math.floor(Date.now() / 1000);
    const bristolStoolScale = 99;

    writeStoolData(userId, timestamp, bristolStoolScale);
  }

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">De logger!</h1>
        <p className="lead">Een simpel tooltje waarbij jij elk bezoek kan loggen</p>
        <br/>
        <br/>
        <br/>
      </div>
      <Row>
        <Col>
          <Button variant="primary" onClick={addStoolButtonClick} >
            Log your visit
          </Button>
        </Col>
        <Col>
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