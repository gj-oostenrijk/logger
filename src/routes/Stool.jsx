import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebase-config';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";

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
  const [stool, setStool] = useState([]);


  const dbStool = ref(db, "users/gj-oostenrijk/stool/");

  const getAllStool = () => {
    onValue(dbStool, (snapshot) => {
      const data = snapshot.val();

      const stoolArray = [];
      for (let i in data ) {
        stoolArray.push(data[i]);
      }
      setStool(stoolArray);
      return stoolArray;
    });

    
  };
  const create = (data) => {
    return db.push(data);
  };
  const update = (key, data) => {
    return db.child(key).update(data);
  };
  const remove = (key) => {
    return db.child(key).remove();
  };
  const removeAll = () => {
    return db.remove();
  };


  function writeStoolData(userId, stoolId, timestamp) {
    // const stoolRef = ref(db, "stool/" + userId);
    // const stoolEntry = {timestamp: timestamp};
    // stoolRef.push(stoolEntry);

    set(ref(db, 'users/' + userId + '/stool/' + stoolId), {
      timestamp: timestamp,
      bristolStoolScale: 5
    });
  }


  useEffect(() => {
      getAllStool();
      stool.sort(function(a, b) {
        return a - b;
      });
  }, []);


    const addStoolTimestamp = () => {
      const userId = "gj-oostenrijk";
      const stoolId = Math.random().toString(36).slice(2, 7);
      const timestamp = Math.floor(Date.now() / 1000);

      writeStoolData(userId, stoolId, timestamp);
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
            <Button variant="primary" onClick={addStoolTimestamp} >
              Log your visit
            </Button>
          </Col>
          <Col>
            {stool ? stool.map((stoolItem, key) => {
              return <div key={key} ><FormattedDate date ={new Date(stoolItem.timestamp * 1000)} /></div>;
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