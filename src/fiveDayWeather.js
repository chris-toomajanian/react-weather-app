import React, { Component } from "react";
import WeatherBox from "./weatherBox";
const axios = require("axios");

class FiveDayWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {
        lat: "",
        lon: "",
      },
      days: [],
      message: "",
    };
  }

  fetchWeather = async pos => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial&lat=${pos.lat}&lon=${pos.lon}`
    );
    console.log(response.data);
    const weatherData = response.data.list.slice(0, 5);
    return weatherData;
  };

  // setting weatherdata and other state here if there was not a lat value previously
  async componentDidUpdate(previousProps) {
    if (previousProps.lat !== this.props.lat) {
      const fiveDayWeather = await this.fetchWeather(this.props.position);
      this.setState({
        days: fiveDayWeather,
        message: "Your five day weather forecast",
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
    // we'll map over the array to setup 5 individual UI components, each with unique daily forecast data
    return (
      <div>
        {this.state.message}
        <div className='flex-container fiveday'>
          {this.state.days.map(day => (
            <WeatherBox
              key={day.dt}
              mintemp={day.main.temp_min}
              maxtemp={day.main.temp_max}
              emoji={day.weather[0].icon}>
              <h3>{day.main.temp_max}</h3>
              <p>{day.main.temp_min}</p>
            </WeatherBox>
          ))}
        </div>
      </div>
    );
  }
}

export default FiveDayWeather;
