import React, { Component } from "react";
import Task from "./Task";
import logo from "../images/logo.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.getRandom = this.getRandom.bind(this);
    this.colorIsUsed = this.colorIsUsed.bind(this);

    this.state = {
      alreadyUsedColors: {}
    };
  }

  loadColors() {
    return [
      "#d1d5da",
      "#fb8532",
      "#34d058",
      "#2188ff",
      "#8a63d2",
      "#ea4a5a",
      "#ffd33d",
      "#00283f",
      "#ccac00",
      "#ac8e9a",
      "#fc8c7e",
      "#f5deb3"
    ];
  }

  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  colorIsUsed(color) {
    let alreadyUsedColorsClone = [{ ...this.state.alreadyUsedColors }];
    if (alreadyUsedColorsClone.includes(color)) {
      return true;
    }
    return false;
  }

  fetchNewColor(colorsArray) {
    let color = this.getRandom(colorsArray);

    if (this.colorIsUsed(color)) {
      return this.getRandom(colorsArray);
    } else {
      //ToDo: the state is not persisted here so it will always enter on this part. Need to fix it.
      let alreadyUsedColorsClone = [{ ...this.state.alreadyUsedColors }];
      alreadyUsedColorsClone[`color-${color}`] = color;
      //this.setState({alreadyUsedColors: alreadyUsedColorsClone});
      return color;
    }
  }

  render() {
    const colors = this.loadColors();

    return (
      <div className="simple-tasks">
        <ul className="tasks-list">
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Brushing Teeth"
            taskDuration={3}
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Boiling eggs"
            taskDuration={5}
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Boiling pastas"
            taskDuration={8}
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Mask on"
            taskDuration={10}
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Meditation"
            taskDuration={15}
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Social Media"
            taskDuration="10"
          />
          <Task
            taskBackgroundColor={this.fetchNewColor(colors)}
            taskName="Tea time"
            taskDuration={5}
          />
        </ul>
      </div>
    );
  }
}

export default App;
