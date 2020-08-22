import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import CurrentGeo from "./currentGeo";
import FiveDayGeo from "./fiveDayGeo";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Current Weather</Link>
              </li>
              <li>
                <Link to='/five-day-forecast'>Five Day Forecast</Link>
              </li>
            </ul>
          </nav>
          <div className='App'>
            <Switch>
              <Route path='/five-day-forecast'>
                <FiveDayGeo />
              </Route>
              <Route path='/'>
                <CurrentGeo />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
