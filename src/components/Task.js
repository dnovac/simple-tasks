import React from "react";

class Task extends React.Component {
  render() {
    return (
      <li className="task-container">
        <h2 className="task-name">Brushing Teeth</h2>
        <span className="task-time">3 min</span>
      </li>
    );
  }
}

export default Task;
