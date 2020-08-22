# Vroom React Code Challenge

## How to view this app locally

Clone the repo, run `yarn` to get the required packages. Set up a `.env` file in the root and add your Open Weather API key to a variable titled `REACT_APP_WEATHER_API_KEY`. Then run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Developer Notes

This was a fun challenge! I think it took roughly 4.25 hours to get to this point. I went over the time just a little because I had to look up some specific syntax for React. These were things I knew how to do conceptually but didn't know the React equivalent.

An example of this:

- getDerivedStateFromProps

## Approach

I wanted to make sure we stored the user's location somehow. For this app, I am saving the lat/long to the browser's local storage so that we can run the component again in a faster time than if the browser had to run geolocation again. However, I didn't get time to run the lookup to see if it has changed (versus whats currently in localstorage). This would be an improvement for sure. Ideally a global state manager would be the best place for this.

There are four data gathering components (currentGeo, currentWeather, fiveDayGeo, and fiveDayWeather). I wanted to have one main Geo component but didn't have time to consolidate and ensure it would work across the routes. Currently, the components reset when changing routes and the button to check location must be clicked again, rather than persisting their data. Their state is updated via props with `getDerivedStateFromProps`. There is one main UI component (weatherBox) which handles the display of weather data. It is receiving different props from currentWeather and fiveDayWeather since there is different data requested.

I am using a common state variable across components called `message`. This variable will return a string with the latest info from the App. This helps display errors if the geolocation fails or success messages when it all works.

Routing is very basic using react-router-dom to change routes.

## What I would do with more time

There are many ways I would improve this app with more time:

- Use a global state library to manage the user's location and messages/information across components in an easier way.
- Smoother experience on route changes, so components are displaying data already known.
- Check to see if geolocation has changed versus what is in local storage to get new weather forecast.
- Size the project down to only having one geo.js component that can gather location and pass on to currentWeather or fiveDayWeather.
- Protect OpenWeather API key in a more secure way than using `process.env`.
- Better structure of JSX in the render() method.
- Overall cleaner code
- Add on a UI package like Tailwind for a better layout.
