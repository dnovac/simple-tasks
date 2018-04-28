import React, { Component } from "react";
import Task from "./Task";
import logo from "../images/logo.svg";

class App extends Component {
  constructor() {
    super();
  }

  loadColors() {
    return [
      "#d1d5da",
      "#fb8532",
      "#34d058",
      "#2188ff",
      "#8a63d2",
      "#ea4a5a",
      "#ffd33d"
    ];
  }

  render() {
    const colors = this.loadColors();

    return (
      <div className="simple-tasks">
        <ul className="tasks-list">
          <Task
            taskBackgroundColor={colors[0]}
            taskName="Brushing Teeth"
            taskDuration="3 min"
          />
          <Task
            taskBackgroundColor={colors[1]}
            taskName="Boiling eggs"
            taskDuration="4 min"
          />
          <Task
            taskBackgroundColor={colors[2]}
            taskName="Boiling pastas"
            taskDuration="8 min"
          />
          <Task
            taskBackgroundColor={colors[3]}
            taskName="Mask on"
            taskDuration="10 min"
          />
          <Task
            taskBackgroundColor={colors[4]}
            taskName="Meditation"
            taskDuration="15 min"
          />
          <Task
            taskBackgroundColor={colors[5]}
            taskName="Social Media"
            taskDuration="10 min"
          />
          <Task
            taskBackgroundColor={colors[6]}
            taskName="Tea time"
            taskDuration="5 min"
          />
        </ul>
      </div>
    );
  }
}

export default App;
