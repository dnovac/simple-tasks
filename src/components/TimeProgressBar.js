import React from 'react';
import Progress from 'react-progressbar';
import NotificationSystem from 'react-notification-system';

import '../css/components/TimeProgressBar.sass';

class TimeProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0, // %
      completedTask: false
    };
  }

  componentDidMount() {
    //bind notification system
    this._notificationSystem = this.refs.notificationSystem;

    const deadlineSeconds = this.props.deadlineMinutes * 60;
    //this interval represents how much in seconds mean 1% from progress bar.
    setInterval(() => this.getSecondsUntilEnd(100/deadlineSeconds), 1000); //each second
  }

  addNotification = () => {
    this._notificationSystem.addNotification({
      message: `${this.props.taskName} task COMPLETED!`,
      level: 'info'
    });
  };

  get100Progress = (currentProgress) => {
    if (Math.round(currentProgress) === 100) {
      return 100;
    } 
    return currentProgress;
  } 

  //TODO: this is called every second
  getSecondsUntilEnd = (progressToUpdateEachSec) => {
    if (this.props.endDate != null) {
      const now = new Date();
      const endDate = this.props.endDate;
      let currentProgress = this.state.progress;

      console.log(
        `NOW: ${now}  END: ${this.props.endDate}`
      );

      if (now.getTime() < endDate.getTime() && currentProgress < 100) {
        currentProgress += progressToUpdateEachSec;
        currentProgress = this.get100Progress(currentProgress);

        this.setState({
          progress: currentProgress
        });
      } /* else if (now.getTime() > endDate.getTime()) {
        //task is completed
        this.setState({
          progress: 0
        });
      }  */
    }
  };

  render() {
    let style = {
      NotificationItem: {
        // Override the notification item
        warning: {
          // Applied only to the success notification item
          color: 'black',
          margin: '20px 10px 20px 10px',
          font: 'OpenSans'
        }
      }
    };
    return (
      <div className="time-progress">
        <Progress completed={this.state.progress} color="#fbc531" />
        <NotificationSystem ref="notificationSystem" style={style} />
        {this.state.progress === 100 ? this.addNotification() : null}
      </div>
    );
  }
}

export default TimeProgressBar;
