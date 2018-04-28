import React from "react";
import '../css/components/Task.sass'

class Task extends React.Component {
  render() {
    return (
      <li className="task-container" style={{backgroundColor: `${this.props.taskBackgroundColor}`}}>
        <h2 className="task-name">{this.props.taskName}</h2>
        <span className="task-duration">{this.props.taskDuration}</span>
      </li>
    );
  }
}

export default Task;
