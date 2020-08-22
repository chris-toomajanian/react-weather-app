import React, { Component } from "react";
import CurrentWeather from "./currentWeather.js";

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
    // checking for one of the two localstorage variables that help us with location
    const storedLocation = localStorage.getItem("lat");
    if (storedLocation) {
      // we have it, no need to do a formal geolocation lookup again
      this.setState({
        message:
          "We already have your location from localstorage, getting your current weather forecast...",
        position: {
          lat: localStorage.getItem("lat"),
          lon: localStorage.getItem("lon"),
        },
      });
    } else {
      // we don't have it, running the geolocation lookup
      this.setState({
        loading: true,
        message: "Getting your location...",
      });
      if (navigator.geolocation) {
        // geolocation was successful
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
        // geolocation failed for some reason, let's see why
        const error = err => {
          this.setState({
            loading: false,
            message: err.message,
          });
          console.log(err.message);
        };

        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        // the user's browser is too old!
        this.setState({
          message: "Sorry, your browser does not support geolocation",
        });
      }
    }
  }

  // if we don't already have geo saved to localstorage, we'll do that here
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
        <CurrentWeather
          position={position}
          lat={position.lat}
          lon={position.lon}
        />
      </div>
    );
  }
}

export default Geo;
