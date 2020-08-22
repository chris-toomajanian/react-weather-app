import React, { Component } from "react";
import "./weatherbox.css";

class WeatherBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      emoji: "",
      max: "",
      min: "",
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      temperature: props.temperature,
      emoji: props.emoji,
      max: props.maxtemp,
      min: props.mintemp,
    };
  }

  render() {
    let image;
    if (this.state.emoji) {
      image = `http://openweathermap.org/img/wn/${this.state.emoji}@2x.png`;
    }

    return (
      <div className='weatherbox'>
        <div>
          <img src={image} alt='' />
        </div>
        <div>
          {this.state.temperature ? this.state.temperature + " degrees" : ""}
        </div>
        <div>
          {this.state.max ? "High Temp " + this.state.max + " degrees" : ""}
        </div>
        <div>
          {this.state.min ? "Low Temp " + this.state.min + " degrees" : ""}
        </div>
      </div>
    );
  }
}

export default WeatherBox;
