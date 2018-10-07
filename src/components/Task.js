import React from 'react';
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
            timerStatus: 'READY_TO_START', //TODO: extract timerStatuses in a var class
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
                timerStatus: 'IN_PROGRESS',
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
            timerStatus: 'READY_TO_START',
            buttonText: 'Start'
        });
    };

    stopCountDown = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            timerStatus: 'READY_TO_START',
            buttonText: 'Start'
        });
    };

    updateCountDown = progressToUpdateEachSec => {
        clearInterval(this.state.intervalId);
        if (
            this.state.timerStatus === 'IN_PROGRESS' &&
            this.state.progress < 100
        ) {
            const now = new Date();
            const endDate = new Date(
                now.getTime() + this.state.secsUntilEnd * 1000
            );

            if (now.getTime() < endDate.getTime()) {
                console.log(`NOW: ${now}  END: ${endDate}    PROG: ${progressToUpdateEachSec}`);
                const secsUntilEnd = this.state.secsUntilEnd - 1;
                let currentProgress = this.getRoundProgress(
                    this.state.progress + progressToUpdateEachSec
                );

                if (currentProgress === 100) {
                    this.addNotification();
                    this.setState({
                        buttonText: 'Reset',
                        timerStatus: 'IS_COMPLETED'
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
        const { index } = this.props;
        const hoverBackgroundColor = this.hexToRgbA(
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
                                case 'READY_TO_START':
                                    this.startCountDown();
                                    break;
                                case 'IN_PROGRESS':
                                    this.stopCountDown();
                                    break;
                                case 'IS_COMPLETED':
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
