import React from 'react';
import utils from '../utils/StaticUtils';
import { status } from '../utils/constNames';
import '../css/components/Task.sass';
import TimeProgressBar from './TimeProgressBar';
import NotificationSystem from 'react-notification-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            timerStatus: status.READY,
            buttonText: 'Start',
            secsUntilEnd: this.props.taskDuration * 60
        };
    }

    componentDidMount() {
        //bind notification system
        this._notificationSystem = this.refs.notificationSystem;
    }

    //****** START COUNTDOWN *********
    startCountDown = () => {
        this.setState(
            {
                timerStatus: status.IN_PROGRESS,
                buttonText: 'Stop'
            },
            function() {
                //this interval represents how much in seconds mean 1% from progress bar.
                let intervalId = setInterval(
                    () =>
                        this.updateCountDown(
                            100 / (this.props.taskDuration * 60)
                        ),
                    1000
                ); //each second
                this.setState({ intervalId: intervalId });
            }
        );
    };

    resetCountDown = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            progress: 0,
            secsUntilEnd: this.props.taskDuration * 60,
            timerStatus: status.READY,
            buttonText: 'Start'
        });
    };

    stopCountDown = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            timerStatus: status.READY,
            buttonText: 'Start'
        });
    };

    updateCountDown = progressToUpdateEachSec => {
        if (
            this.state.timerStatus === status.IN_PROGRESS &&
            this.state.progress < 100
        ) {
            const now = new Date();
            const endDate = new Date(
                now.getTime() + this.state.secsUntilEnd * 1000
            );

            if (now.getTime() < endDate.getTime()) {
                console.log(
                    `NOW: ${now}  END: ${endDate}    PROG: ${progressToUpdateEachSec}`
                );
                const secsUntilEnd = this.state.secsUntilEnd - 1;
                let currentProgress = this.getRoundProgress(
                    this.state.progress + progressToUpdateEachSec
                );

                if (currentProgress === 100) {
                    this.addNotification();
                    this.setState({
                        buttonText: 'Reset',
                        timerStatus: status.COMPLETED
                    });
                }

                this.setState({
                    progress: currentProgress,
                    secsUntilEnd
                });
            }
        }
    };

    addNotification = () => {
        this._notificationSystem.addNotification({
            message: `${this.props.taskName} task COMPLETED!`,
            level: 'info'
        });
    };

    getRoundProgress = currentProgress => {
        if (Math.round(currentProgress) === 100) {
            return 100;
        }
        return currentProgress;
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
        const buttonColor = this.props.taskBackgroundColor;
        const { index } = this.props;
        const hoverBackgroundColor = utils.hexToRgbA(
            this.props.taskBackgroundColor,
            0.5
        );

        //tip: const backgroundColor = styles.backgroundColorVar;
        //exported var used in js from sass
        return (
            <div
                className="task-container"
                style={{
                    background: `linear-gradient(white, white 50%, ${hoverBackgroundColor} 50%, ${hoverBackgroundColor})`
                }}>
                <button
                    className="task-delete-ico"
                    onClick={() => this.props.removeTask(index)}>
                    <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
                <NotificationSystem ref="notificationSystem" style={style} />
                <div className="task-name">
                    <span className="highlight" title={this.props.task}>
                        {this.props.taskName}
                    </span>
                </div>
                <div className="task-duration">
                    {this.props.taskDuration} Minutes
                </div>
                <div className="time-progress-container">
                    <FontAwesomeIcon
                        icon={['far', 'clock']} //fas is the default prefix (font-awesome-solid)
                        size="1x"
                        className="time-progress-ico"
                    />
                    <div className="time-progress-bar">
                        <TimeProgressBar
                            progress={this.state.progress}
                            taskName={this.props.taskName}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button
                        className="button-start-task"
                        style={{
                            backgroundColor: `${buttonColor}`
                        }}
                        onClick={() => {
                            switch (this.state.timerStatus) {
                                case status.READY:
                                    this.startCountDown();
                                    break;
                                case status.IN_PROGRESS:
                                    this.stopCountDown();
                                    break;
                                case status.COMPLETED:
                                    this.resetCountDown();
                                    break;
                                default:
                                    this.startCountDown();
                            }
                        }}>
                        {this.state.buttonText}
                    </button>
                </div>
            </div>
        );
    }
}

export default Task;
