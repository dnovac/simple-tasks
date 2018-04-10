import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Simple Tasks</h1>
        </header>
        <p className="App-intro">
          You can choose a simple task to count the minutes from begin -> end 
          <p>Settings -> set minutes / set tasks on homepage</p>
        </p>
      </div>
    );
  }
}

export default App;
