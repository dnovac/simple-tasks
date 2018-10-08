import React, { Component } from 'react';

import Utils from '../utils/StaticUtils';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarPlus, faClock } from '@fortawesome/free-regular-svg-icons';
import '../css/components/App.sass';

import Task from './Task';
import AddTaskForm from './AddTaskForm';

class App extends Component {
    constructor() {
        super();

        //font awesome
        library.add(faCalendarPlus, faClock);

        this.state = {
            tasks: {},
            colors: Utils.loadTaskColors()
        };
    }

    loadSamples = () => {
        return {
            'task-1539027092861': {
                name: 'adsd',
                time: '5'
            }
        };
    };

    //**** when load the page get all tasks from local storage if case
    componentWillMount = () => {
        //Convert back to JS object, reading from LocalStorage
        const tasksFromLocalState =
            (localStorage.getItem('tasks') != null || Utils.isEmpty(localStorage.getItem('tasks')))
                ? JSON.parse(localStorage.getItem('tasks'))
                : this.loadSamples();
        //copy from localStorage to state
        let tasks = Object.assign(this.state.tasks, tasksFromLocalState);
        //set state
        this.setState({
            tasks
        });
    };

    addTask = task => {
        //update state
        const tasks = { ...this.state.tasks };
        //add in new task
        const timestamp = Date.now(); //for unique key
        tasks[`task-${timestamp}`] = task; //this is the updated tasks but not yet set on state

        //set state and update local storage
        this.setState({ tasks }, this.saveToLocalStorage);
    };

    removeTask = key => {
        const tasks = { ...this.state.tasks };
        delete tasks[key];
        this.setState({ tasks }, this.saveToLocalStorage);
    };

    saveToLocalStorage = () => {
        const tasks = this.state.tasks;
        //Convert it to String before saving to LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    render() {
        const tasks = this.state.tasks;
        let i = 0;
        return (
            <MuiThemeProvider>
                <div className="simple-tasks">
                    <div className="container-tasks-list">
                        {tasks
                            ? Object.keys(tasks).map(key => (
                                  <Task
                                      key={key}
                                      index={key}
                                      taskBackgroundColor={
                                          this.state.colors[i++]
                                      }
                                      taskName={tasks[key].name}
                                      taskDuration={tasks[key].time}
                                      removeTask={this.removeTask}
                                  />
                              ))
                            : null}
                        <AddTaskForm addTask={this.addTask} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
