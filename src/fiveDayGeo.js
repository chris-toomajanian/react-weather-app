import React, { Component } from "react";
import FiveDayWeather from "./fiveDayWeather.js";

class Geo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {},
      loading: null,
      message: "",
    };
  }

  getLoc() {
    const storedLocation = localStorage.getItem("lat");
    if (storedLocation) {
      // we have it, no need to run this again
      this.setState({
        message:
          "We already have your location from localstorage, getting your five day weather forecast...",
        position: {
          lat: localStorage.getItem("lat"),
          lon: localStorage.getItem("lon"),
        },
      });
    } else {
      this.setState({
        loading: true,
        message: "Getting your location...",
      });
      if (navigator.geolocation) {
        const success = pos => {
          console.log(pos.coords.latitude, pos.coords.longitude);
          this.setState({
            position: {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
            },
          });
          this.addToLocalStorage(pos.coords.latitude, pos.coords.longitude);
          this.setState({
            loading: false,
            message: "",
          });
        };

        const error = err => {
          this.setState({
            loading: false,
            message: err.message,
          });
          console.log(err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        this.setState({
          message: "Sorry, your browser does not support geolocation",
        });
      }
    }
  }

  addToLocalStorage(lat, lon) {
    const storedLocation = localStorage.getItem("lat");
    if (!storedLocation) {
      localStorage.setItem("lat", lat);
      localStorage.setItem("lon", lon);
    } else {
      return;
    }
  }

  render() {
    const position = this.state.position;
    return (
      <div>
        <button onClick={() => this.getLoc()}>Use my location</button>
        <br />
        {this.state.message}
        <br />
        <br />
        <FiveDayWeather
          position={position}
          lat={position.lat}
          lon={position.lon}
        />
      </div>
    );
  }
}

export default Geo;
