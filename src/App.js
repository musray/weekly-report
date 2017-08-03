import React, { Component } from 'react';
import DayEntry from './DayEntry';

class App extends Component {
  render() {
    return (
      <div>
        <h1>周报系统</h1>
        <DayEntry />
      </div>
    );
  }
}

export default App;
