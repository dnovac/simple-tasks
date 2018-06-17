import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

class App extends Component {
  constructor() {
    super();

    this.addTask = this.addTask.bind(this);

    this.state = {
      tasks: {},
      colors: [
        '#d1d5da',
        '#fb8532',
        '#34d058',
        '#2188ff',
        '#8a63d2',
        '#ea4a5a',
        '#ffd33d',
        '#00283f',
        '#ccac00',
        '#ac8e9a',
        '#fc8c7e',
        '#f5deb3'
      ]
    };
  }

  addTask = task => {
    //update our state
    const tasks = { ...this.state.tasks };
    //add in our new task
    const timestamp = Date.now(); //for unique key
    tasks[`task-${timestamp}`] = task; //this is the updated tasks but not yet set on state
    //set state
    this.setState({ tasks });
  };

  render() {
    const tasks = this.state.tasks;
    return (
      <MuiThemeProvider>
        <div className="simple-tasks">
          <ul className="tasks-list">
            {Object.keys(tasks).map(key => (
              <Task
                taskBackgroundColor={this.state.colors[0]}
                taskName={tasks[key].name}
                taskDuration={tasks[key].time}
              />
            ))}
            <Task
              taskBackgroundColor={this.state.colors[0]}
              taskName="Brushing Teeth"
              taskDuration={3}
            />
            <Task
              taskBackgroundColor={this.state.colors[1]}
              taskName="Boiling eggs"
              taskDuration={5}
            />
            <Task
              taskBackgroundColor={this.state.colors[2]}
              taskName="Boiling pastas"
              taskDuration={8}
            />
            <Task
              taskBackgroundColor={this.state.colors[3]}
              taskName="Mask on"
              taskDuration={10}
            />
            <Task
              taskBackgroundColor={this.state.colors[4]}
              taskName="Meditation"
              taskDuration={15}
            />
            <Task
              taskBackgroundColor={this.state.colors[5]}
              taskName="Social Media"
              taskDuration="10"
            />
            <Task
              taskBackgroundColor={this.state.colors[6]}
              taskName="Tea time"
              taskDuration={5}
            />
          </ul>

          <div className="new-task-container">
            <AddTaskForm addTask={this.addTask} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
