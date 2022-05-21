import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, Image, Table } from 'react-bootstrap';
import { useUserContext } from '../context/UserContext';

function FormattedDate({ date }) {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return <span>{date.toLocaleString('nl-NL', options)}</span>;
}

function Stool() {
  const { currentUserAuth, currentUserData, writeStoolData } = useUserContext();
  const [stoolList, setStoolList] = useState();
  const [inputBristol, setInputBristol] = useState(4);
  const [inputComment, setInputComment] = useState('');
  const [isShowImage, setIsShowImage] = useState(false);

  function addStoolButtonClick() {
    const timestamp = Math.floor(Date.now() / 1000);

    writeStoolData(timestamp, inputComment, inputBristol);
    setInputComment('');
    setInputBristol(4);
  }

  function createStoolArray() {
    const items = [];
    if (currentUserData && currentUserData.stool) {
      Object.values(currentUserData.stool).forEach((item) => {
        items.push({
          date: new Date(item.timestamp * 1000),
          ...item,
        });
      });
    }
    setStoolList(items);
  }

  useEffect(() => {
    createStoolArray();
  }, [currentUserData]);

  return (
    <Row className="row align-items-md-stretch">
      <Col md={6}>
        <div className="h-100 p-5 text-white bg-dark rounded-3">
          <h3>Add a new log</h3>
          <Form.Group className="mb-3">
            <Form.Label>User</Form.Label>
            <Form.Select disabled defaultValue={currentUserAuth.email}>
              <option value={currentUserAuth.email}>
                {currentUserAuth.email}
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Bristol Stool Scale:
              {inputBristol}
            </Form.Label>
            <Form.Range
              min={1}
              max={7}
              step={1}
              defaultValue={3}
              onChange={(e) => setInputBristol(e.target.value)}
            />
            <Form.Text className="text-muted">
              Scale 1–7: hard to soft. See image below.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputComment">Comment</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Describe your visit"
              id="inputComment"
              onChange={(e) => setInputComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={addStoolButtonClick}>
            Log a new visit
          </Button>
          <br />
          <br />
          <br />
          <Button
            onClick={() => setIsShowImage(!isShowImage)}
            variant="outline-secondary"
          >
            {!isShowImage ? 'Show' : 'Hide'} Bristol Stool Scale image
          </Button>
          {isShowImage && (
            <Image
              fluid
              rounded
              src={`${process.env.PUBLIC_URL}/assets/img/bristol.png`}
              alt="bristol stool chart"
            />
          )}
        </div>
      </Col>
      <Col md={6}>
        <div className="h-100 p-5 bg-light border rounded-3">
          <h4>
            {currentUserAuth.email}
            &apos;s log
          </h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Bristol</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {stoolList &&
                (stoolList.length === 0 ? (
                  <tr>
                    <td colSpan={3}>No logs yet</td>
                  </tr>
                ) : (
                  stoolList.map((stoolItem) => (
                    <tr key={stoolItem.timestamp}>
                      <td>
                        <FormattedDate date={stoolItem.date} />
                      </td>
                      <td>{stoolItem.bristolStoolScale}</td>
                      <td>{stoolItem.comment}</td>
                    </tr>
                  ))
                ))}
              {!stoolList && (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}

export default Stool;
