import React from 'react';
import '../css/components/Task.sass';
import TimeProgressBar from './TimeProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
        `,${opacity})`
      );
    }
    throw new Error('Bad Hex');
  };

  render() {
    const buttonColor = this.props.taskBackgroundColor;
    const hoverBackgroundColor = this.hexToRgbA(this.props.taskBackgroundColor, 0.5);

    //const backgroundColor = styles.backgroundColorVar;
    //exported var used in js from sass

    return (
      <div
        className="task-container"
        style={{
          background: `linear-gradient(white, white 50%, ${hoverBackgroundColor} 50%, ${hoverBackgroundColor})`
        }}
      >
        <div className="task-name">
          <span
            className="highlight"
            /* style={
              {
                backgroundImage: `linear-gradient(to right, ${buttonColor} 30%, #fff 100%)`
              }
            } */
          >
            {this.props.taskName}
          </span>
        </div>
        <div className="task-duration">{this.props.taskDuration} Minutes</div>
        <div className="time-progress-container">
          <FontAwesomeIcon
            icon={['far', 'clock']} //fas is the default prefix (font-awesome-solid)
            size="1x"
            className="time-progress-ico"
          />
          <div className="time-progress-bar">
            <TimeProgressBar
              deadlineMinutes={this.props.taskDuration}
              endDate={this.state.endDate}
              startDate={this.state.startDate}
            />
          </div>
        </div>
        <div className="button-container">
          <button
            className="button-start-task"
            style={{ backgroundColor: `${buttonColor}` }}
            onClick={() => this.setTimerInterval(this.props.taskDuration)}
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}

export default Task;
