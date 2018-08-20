import React from 'react';
import Progress from 'react-progressbar';
import '../css/components/TimeProgressBar.sass';

class TimeProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            completedTask: false
        };
    }

    render() {
        return (
            <div className="time-progress">
                <Progress completed={this.props.progress} color="#fbc531" />
            </div>
        );
    }
}

export default TimeProgressBar;
