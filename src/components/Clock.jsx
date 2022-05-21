import React from 'react';

function FormattedDate({ date }) {
  return <span>{date.toLocaleTimeString()}</span>;
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { date } = this.state;
    return <FormattedDate date={date} />;
  }
}

export default Clock;
