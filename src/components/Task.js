import React from 'react';
import '../css/components/Task.sass';
import TimeProgressBar from './TimeProgressBar';
import NotificationSystem from 'react-notification-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isStarted: false,
            isStopped: false,
            isCompleted: false,
            progress: 0,
            buttonText: 'Start',
            secsUntilEnd: this.props.taskDuration * 60
        };
    }

    componentDidMount() {
        //bind notification system
        this._notificationSystem = this.refs.notificationSystem;
    }

    //****** START COUNTDOWN
    startCountDown = () => {
        if (this.state.isCompleted) {
            this.setState({
                progress: 0,
                isCompleted: false,
                buttonText: 'Start'
            });
            console.log('progress: ' + this.state.progress);

        } else {
            this.setState({
                isStarted: true,
                isStopped: false,
                buttonText: 'Stop'
            });
            //this interval represents how much in seconds mean 1% from progress bar.
            setInterval(
                () =>
                    this.updateCountDown(100 / (this.props.taskDuration * 60)),
                1000 //each second
            );
        }
    };

    stopCountDown = () => {
        this.setState({
            isStarted: false,
            isStopped: true,
            buttonText: 'Start'
        });
    };

    updateCountDown = progressToUpdateEachSec => {
        if (this.state.isStarted && this.state.progress < 100) {
            const now = new Date();
            const endDate = new Date(
                now.getTime() + this.state.secsUntilEnd * 1000
            );

            console.log(`NOW: ${now}  END: ${endDate}`);

            if (now.getTime() < endDate.getTime()) {
                const secsUntilEnd = this.state.secsUntilEnd - 1;
                let currentProgress = this.getRoundProgress(
                    this.state.progress + progressToUpdateEachSec
                );

                this.setState({
                    progress: currentProgress,
                    secsUntilEnd
                });
                if (currentProgress === 100) {
                    this.addNotification();
                    this.setState({
                        buttonText: 'Reset',
                        isCompleted: true
                    });
                }
            }
        }
    };

    addNotification = () => {
        this._notificationSystem.addNotification({
            message: `${this.props.taskName} task COMPLETED!`,
            level: 'info'
        });
    };

    //TODO: move it into utils
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
        const hoverBackgroundColor = this.hexToRgbA(
            this.props.taskBackgroundColor,
            0.5
        );

        //const backgroundColor = styles.backgroundColorVar;
        //exported var used in js from sass

        return (
            <div
                className="task-container"
                style={{
                    background: `linear-gradient(white, white 50%, ${hoverBackgroundColor} 50%, ${hoverBackgroundColor})`
                }}>
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
                        onClick={() =>
                            !this.state.isStarted || this.state.isCompleted
                                ? this.startCountDown()
                                : this.stopCountDown()
                        }>
                        {this.state.buttonText}
                    </button>
                </div>
            </div>
        );
    }
}

export default Task;
