import React from 'react';
import Progress from 'react-progressbar';

import '../css/components/TimeProgressBar.sass';

class TimeProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0 // %
    };
  }

  componentDidMount() {
    const deadlineSeconds = this.props.deadlineMinutes * 60;
    //this interval represents how much in seconds mean 1% from progress bar.
    const timeIntervalToUpdate = deadlineSeconds / 100;

    setInterval(() => this.getSecondsUntil(), timeIntervalToUpdate * 1000);
  }

  getSecondsUntil() {
    const now = new Date();
    const endDate = this.props.endDate;

    let currentProgress = this.state.progress;

    if (now.getTime() < endDate.getTime()) {
      currentProgress++;

      this.setState({
        progress: currentProgress
      });

      console.log(`=>>> start: ${now.getTime()} || end: ${endDate.getTime()}`);
    }
  }

  render() {
    return (
      <div className="time-progress">
        <Progress completed={this.state.progress} color="#e440e2" />
      </div>
    );
  }
}

export default TimeProgressBar;
