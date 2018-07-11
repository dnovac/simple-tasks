import React, { Component } from 'react';
import '../css/components/AddTaskForm.sass';

class AddTaskForm extends Component {
  createTask(event) {
    event.preventDefault();

    console.log('********* ONE MORE TASK ***********');

    const task = {
      name: this.name.value,
      time: this.time.value
    };

    this.props.addTask(task);

    //reset form to empty fields
    this.taskForm.reset();
    //this.props.setState({showAddForm: false}) ->hide inputs
  }

  render() {
    return (
      <form
        ref={input => (this.taskForm = input)}
        className="task-add-form"
        onSubmit={e => this.createTask(e)}
      >
        <input
          ref={input => (this.name = input)}
          type="text"
          placeholder="Name"
          className="task-form-input"
        />
        <input
          ref={input => (this.time = input)}
          type="text"
          placeholder="Duration"
          className="task-form-input"
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddTaskForm;
