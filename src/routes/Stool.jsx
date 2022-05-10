import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Form, Image, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase-config";
import { ref, push, set, onValue } from "firebase/database";
import cryptoJs from "crypto-js";

function FormattedDate({ date }) {
  let options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return <span>{date.toLocaleString("nl-NL", options)}</span>;
}

function encryptString(text) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
}

const Stool = () => {
  const { currentUser } = useAuth();
  const [isShowImage, setIsShowImage] = useState(false);
  const [stoolList, setStoolList] = useState();
  const commentRef = useRef();
  const bristolRef = useRef();

  const getStoolListForUser = (userId) => {
    const dbRef = ref(db, "users/" + userId + "/stool/");

    onValue(dbRef, (snapshot) => {
      let items = [];
      snapshot.forEach((child) => {
        items.push({
          date: new Date(child.val().timestamp * 1000),
          ...child.val(),
        });
      });
      console.log(items);
      setStoolList(items);
    });
  };

  function writeStoolData(userId, timestamp, comment, bristolStoolScale) {
    const newStoolRef = ref(db, "users/" + userId + "/stool/");
    set(push(newStoolRef), {
      timestamp: timestamp,
      bristolStoolScale: bristolStoolScale,
      comment: comment,
    });
  }

  useEffect(() => {
    getStoolListForUser(currentUser.uid);
  }, []);

  function addStoolButtonClick(e) {
    const timestamp = Math.floor(Date.now() / 1000);

    writeStoolData(
      currentUser.uid,
      timestamp,
      commentRef.current.value,
      bristolRef.current.value
    );
    commentRef.current.value = "";
    bristolRef.current.value = 3;
  }

  return (
    <>
      <Row className="row align-items-md-stretch">
        <Col md={6}>
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <h3>Add a new log</h3>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Select disabled defaultValue={currentUser.email}>
                <option value={currentUser.email}>{currentUser.email}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bristol Stool Scale 1-7 (hard to soft)</Form.Label>
              <Form.Range
                min={1}
                max={7}
                step={1}
                defaultValue={3}
                ref={bristolRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputComment">Comment</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Describe your visit"
                id="inputComment"
                ref={commentRef}
              />
            </Form.Group>
            <Button variant="primary" onClick={addStoolButtonClick}>
              Log a new visit
            </Button>
            <br />
            <br />
            <br />
            <Button
              onClick={(e) => setIsShowImage(!isShowImage)}
              variant="outline-secondary"
            >
              {!isShowImage ? "Show" : "Hide"} Bristol Stool Scale image
            </Button>
            {isShowImage && (
              <Image
                fluid
                rounded
                src={process.env.PUBLIC_URL + "/assets/img/bristol.png"}
                alt="bristol stool chart"
              />
            )}
          </div>
        </Col>
        <Col md={6}>
          <div className="h-100 p-5 bg-light border rounded-3">
            <h4>{currentUser.email}'s log</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Bristol</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {stoolList ? (
                  stoolList.length === 0 ? (
                    <tr>
                      <td colSpan={3}>No logs yet</td>
                    </tr>
                  ) : (
                    stoolList.map((stoolItem, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <FormattedDate date={stoolItem.date} />
                          </td>
                          <td>{stoolItem.bristolStoolScale}</td>
                          <td>{stoolItem.comment}</td>
                        </tr>
                      );
                    })
                  )
                ) : (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Stool;
