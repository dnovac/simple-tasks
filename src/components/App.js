import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Task from './Task';

class App extends Component {
  constructor() {
    super();

    /*   this.fetchNewColor = this.fetchNewColor.bind(this);
    this.nextColor = this.nextColor.bind(this); */

    this.state = {
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

  /* 
  colorAlreadyUsed = color => {
    let usedColors = this.state.alreadyUsedColors;
    if (usedColors.includes(color)) {
      return true;
    } else {
      return false;
    }
  };

  fetchNewColor = () => {
    let colors = this.state.colors;

    for (let index = 0; index < colors.length; index++) {
      const color = colors[index];

      if (this.colorAlreadyUsed(color)) {
        index++;
        return;
      } else {
        let alreadyUsedColorsClone = [...this.state.alreadyUsedColors];
        alreadyUsedColorsClone.push(color);
        console.log(`arrayCol: ${color}`);
        //this.setState({ alreadyUsedColors: alreadyUsedColorsClone });
        return color;
      }
    }
  }; */

  render() {
    return (
      <MuiThemeProvider>
        <div className="simple-tasks">
          <ul className="tasks-list">
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
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
