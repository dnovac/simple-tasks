import React, { Component } from "react";
import Task from "./Task";
import logo from "../images/logo.svg";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="simple-tasks">
        <ul className="list-tasks">
          <Task />
          <Task />
          <Task />
          <Task />
        </ul>
      </div>
    );
  }
}

export default App;
