import React from "react";

function FormattedDate(props) {
    return <span>{props.date.toLocaleTimeString()}</span>;
}

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <>
          <FormattedDate date={this.state.date} />
        </>
      );
    }
  }

  export default Clock;