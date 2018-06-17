import React, { Component } from 'react';
import '../css/components/AddTaskForm.sass';
import TextField from '@material-ui/core/TextField';

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
          placeholder="Task Name"
          className="task-form-name"
        />
        <input
          ref={input => (this.time = input)}
          type="text"
          placeholder="Task Time"
          className="task-form-time"
        />
        {/* <TextField
          ref={input => (this.name = input)}
          id="name"
          label="Name"
          className="task-form-name"
          margin="normal"
        />
        <TextField
          ref={input => (this.time = input)}
          id="name"
          label="Name"
          className="task-form-time"
          margin="normal"
        />
 */}
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddTaskForm;
