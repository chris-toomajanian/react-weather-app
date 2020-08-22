import React, { Component } from "react";
import WeatherBox from "./weatherBox.js";
const axios = require("axios");

class CurrentWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        lat: "",
        lon: "",
      },
      weather: {},
      temperature: "",
      emoji: "",
      message: "",
    };
  }

  fetchWeather = async pos => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${pos.lat}&lon=${pos.lon}&units=imperial`
    );
    const weatherData = response.data;
    return weatherData;
  };

  // setting weatherdata and other state here if there was not a lat value previously
  async componentDidUpdate(previousProps) {
    if (previousProps.lat !== this.props.lat) {
      const currentWeather = await this.fetchWeather(this.props.position);
      this.setState({
        weather: currentWeather,
        temperature: currentWeather.main,
        emoji: currentWeather.weather[0].icon,
        message: "Your current weather forecast:",
      });
    }
  }

  // watch for props coming in to help set the state up correctly
  static getDerivedStateFromProps(props) {
    return {
      position: {
        lat: props.lat,
        lon: props.lon,
      },
    };
  }

  render() {
    return (
      <div>
        {this.state.message}
        <div className='flex-container'>
          <WeatherBox
            temperature={this.state.temperature.temp}
            emoji={this.state.emoji}
          />
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
