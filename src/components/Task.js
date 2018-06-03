import React from 'react';
import '../css/components/Task.sass';
import TimeProgressBar from './TimeProgressBar';
import Button from '@material-ui/core/Button';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date()
    };
  }

  setTimerInterval(duration) {
    let startDate = new Date();
    let endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + duration);

    this.setState({ startDate, endDate });
  }

  render() {
    return (
      <li
        className="task-container"
        style={{ backgroundColor: `${this.props.taskBackgroundColor}` }}
      >
        <h2 className="task-name">{this.props.taskName}</h2>
        <span className="task-duration">{this.props.taskDuration} Minutes</span>
        <div className="time-progress-bar">
          <TimeProgressBar
            deadlineMinutes={this.props.taskDuration}
            endDate={this.state.endDate}
            startDate={this.state.startDate}
          />
        </div>
        <div className="button-container">
          <Button
            variant="raised"
            color="primary"
            className="button"
            onClick={() => this.setTimerInterval(this.props.taskDuration)}
          >
            Start
          </Button>
        </div>
      </li>
    );
  }
}

export default Task;
