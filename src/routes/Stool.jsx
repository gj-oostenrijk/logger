import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../App.css';


class Stool extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 0,
      };
      this.updateCount = this.updateCount.bind(this);
    }

    updateCount() {
      this.setState((prevState, props) => {
        return { count: prevState.count + 1 }
      });
    }
  
    render() {
      return (
        <>
          <div className="jumbotron">
            <h1 className="display-4">De stoelgang logger!</h1>
            <p className="lead">Een simpel tooltje waarbij jij elk toiletbezoek kan loggen</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <Link className="btn btn-primary btn-lg" to="/about" role="button">Learn more</Link>
            <br /><br/>
          </div>

          <Row>
            <Col>
              <div id="stool-box">
              {this.state.count}
              <Button id="addStool" variant="outline-primary" onClick={() => this.updateCount()} >Add stool</Button>
            </div>
            </Col>
            <Col>
              <h2>Hey, lukt het met het loggen?</h2>
              <p>Bij vragen laat mij weten!</p>
            </Col>
          </Row>
        </>
      );
    };
  
};

export default Stool;