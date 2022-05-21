import React from 'react';
import Clock from './Clock';

function Jumbotron() {
  return (
    <div className="bg-light p-5 mb-4 rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">The Ultimate Logger App!</h1>
        <p className="col-md-8 fs-4">
          Een simpel tooltje waarbij jij elk <em>&apos;bezoek&apos;</em> kan
          loggen 💩
        </p>
        <Clock />
      </div>
    </div>
  );
}

export default Jumbotron;
