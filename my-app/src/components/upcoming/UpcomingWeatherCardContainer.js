import React from "react";

import { UpcomingWeatherCard } from "./UpcomingWeatherCard.js";

class UpcomingWeatherCardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fiveDayAPI: {},
      fiveDayForecastState: [],
      location: this.props.location
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.location !== this.props.location) {
      this.setState(
        {
          location: this.props.location
        },
        this.getWeather
      );
    }
  };

  componentDidMount = () => {
    this.getWeather();
  };

  getWeather = () => {
    // Fetch OpenWeather API Details
    const openWeatherKey = "7e4780fbb35b9a856e06b14964223403";
    const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast";
    const urlToFetch = `${weatherUrl}?&q=${
      this.state.location
    }&APPID=${openWeatherKey}&units=metric`;

    fetch(urlToFetch)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          fiveDayAPI: data
        });

        this.createFiveDayForecast();
      });
  };

  createFiveDayForecast = () => {
    let currentDate = new Date().setHours(23, 59, 59, 0) / 1000;
    let currentDayIndex = 0;
    let fiveDayForecast = [];
    let fiveDayAPIDataList = this.state.fiveDayAPI.list;
    let weatherTypes = [[], [], [], [], []];
    let upcomingTemps = [];

    // create forecast object & upcoming tempratures object

    for (let i = 0; i < 5; i++) {
      fiveDayForecast.push({
        dayOfWeek: "",
        weatherType: "",
        minTemp: "N/A",
        maxTemp: "N/A"
      });
    }
    // loops through everyday from the data
    for (let i = 0; i < fiveDayAPIDataList.length; i++) {
      if (fiveDayAPIDataList[i].dt > currentDate + 93600 * currentDayIndex) {
        // adding data into fiveDayForecast object
        fiveDayForecast[currentDayIndex].dayOfWeek = this.getDays(
          fiveDayAPIDataList[i].dt * 1000
        );
        fiveDayForecast[
          currentDayIndex
        ].weatherType = this.findMostCommonString(
          weatherTypes[currentDayIndex]
        );

        currentDayIndex++;
        if (currentDayIndex > 4) break;
      }

      // set max temprature
      if (
        fiveDayAPIDataList[i].main.temp_max >
          fiveDayForecast[currentDayIndex].maxTemp ||
        fiveDayForecast[currentDayIndex].maxTemp === "N/A"
      ) {
        fiveDayForecast[currentDayIndex].maxTemp =
          fiveDayAPIDataList[i].main.temp_max;
      }

      // set min temprature
      if (
        fiveDayAPIDataList[i].main.temp_min <
          fiveDayForecast[currentDayIndex].minTemp ||
        fiveDayForecast[currentDayIndex].minTemp === "N/A"
      ) {
        fiveDayForecast[currentDayIndex].minTemp =
          fiveDayAPIDataList[i].main.temp_min;
      }

      // grab all weather types and push into seperate arrays for different days
      weatherTypes[currentDayIndex].push(
        fiveDayAPIDataList[i].weather[0].description
      );

      // create array of upcoming temps for the graph
      if (currentDayIndex > 2) {
        upcomingTemps.push({
          temp: fiveDayAPIDataList[i].main.temp,
          time: fiveDayAPIDataList[i].dt
        });
      }
    }

    //set the state with the 5 day forecast
    this.setState({
      fiveDayForecastState: fiveDayForecast
    });
  };

  getDays = data => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(data);
  };

  findMostCommonString = strings => {
    return strings
      .sort(
        (a, b) =>
          strings.filter(v => v === a).length -
          strings.filter(v => v === b).length
      )
      .pop();
  };

  render = () => {
    return (
      <UpcomingWeatherCard fiveDayForecast={this.state.fiveDayForecastState} />
    );
  };
}

export default UpcomingWeatherCardContainer;
