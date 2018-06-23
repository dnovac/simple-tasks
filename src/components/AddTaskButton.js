import React, { Component } from 'react';
import AddTaskForm from './AddTaskForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/components/AddTaskButton.sass';

class AddTaskButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false
    };
  }

  onClick = () => {
    this.setState({ showAddForm: !this.state.showAddForm });
  };

  render() {
    return (
      <div className="add-task-wrapper">
        {this.state.showAddForm ? (
          <AddTaskForm addTask={this.props.addTask} />
        ) : null}
        <FontAwesomeIcon
          icon={['far', 'calendar-plus']} //fas is the default prefix (font-awesome-solid)
          size="6x"
          onClick={this.onClick}
          className="add-task-ico"
        />
      </div>
    );
  }
}

export default AddTaskButton;
