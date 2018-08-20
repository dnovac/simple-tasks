import React, { Component } from 'react';
import '../css/components/AddTaskForm.sass';
import '../css/components/Task.sass';

class AddTaskForm extends Component {
    createTask(event) {
        event.preventDefault();

        console.log('👌 ONE MORE TASK 🙀');

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
            <div className="task-container" style={{ background: `white` }}>
                <form
                    ref={input => (this.taskForm = input)}
                    className="task-add-form"
                    onSubmit={e => this.createTask(e)}>
                    <input
                        ref={input => (this.name = input)}
                        type="text"
                        placeholder="Name"
                        className="task-form-input"
                        required="required"
                    />
                    <input
                        ref={input => (this.time = input)}
                        type="number"
                        placeholder="Minutes"
                        className="task-form-input"
                        required="required"
                    />
                    <button
                        type="submit"
                        className="button-start-task"
                        style={{ backgroundColor: `#000` }}>
                        Add Task
                    </button>
                </form>
            </div>
        );
    }
}

export default AddTaskForm;
