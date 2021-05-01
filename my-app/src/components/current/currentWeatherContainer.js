import React from "react";
import { CurrentWeather } from "./CurrentWeather";

class CurrentWeatherContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
      currentAPI: {},
      unit : "metric",
      currentForecastState: {
        weatherType: "",
        maxTemp: "N/A",
        minTemp: "N/A"
      }
    };
  }

  componentDidUpdate = (prevProps,prevState) => {
    if (prevProps.location !== this.props.location || prevState.unit !== this.state.unit) {
      this.setState(
        {
          location: this.props.location
        },
        this.getWeather
      );
    }
  };

  componentDidMount(){
    this.getWeather();
  };

  getWeather = () => {
    // OpenWeather Info
    const openWeatherKey = "7e4780fbb35b9a856e06b14964223403";
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const urlToFetch = `${weatherUrl}?&q=${
      this.state.location
    }&APPID=${openWeatherKey}&units=${this.state.unit}`;

    fetch(urlToFetch)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          currentAPI: data
        });
        this.createCurrentWeather();
      });
  };

  createCurrentWeather = () => {
    let currentAPI = this.state.currentAPI;
    let currentWeather = {
      weatherType: "",
      weatherIcon: "",
      minTemp: "N/A",
      maxTemp: "N/A",
      humidity : "N/A",
      pressure : "N/A"
    };

    currentWeather.weatherType = currentAPI.weather[0].description;
    currentWeather.minTemp = currentAPI.main.temp_min;
    currentWeather.maxTemp = currentAPI.main.temp_max;
    currentWeather.humidity = currentAPI.main.humidity;
    currentWeather.pressure = currentAPI.main.pressure;
    currentWeather.weatherIcon = this.setWeatherIcon(
      currentWeather.weatherType
    );

    //set the state with the current forecast
    this.setState({
      currentForecastState: currentWeather
    });
  };

  setWeatherIcon = (weatherType) => {
    switch (weatherType) {
        case "clear sky":
          return "sun";
  
        case "scattered clouds":
        case "few clouds":
        case "broken clouds":
        case "overcast clouds":
          return "cloud";
  
        case "shower rain":
        case "light intensity drizzle":
        case "drizzle":
        case "heavy intensity drizzle":
        case "light intensity drizzle rain":
        case "drizzle rain":
        case "heavy intensity drizzle rain":
        case "shower rain and drizzle":
        case "heavy shower rain and drizzle":
        case "shower drizzle":
        case "heavy intensity shower rain":
        case "ragged shower rain":
        case "light rain":
        case "rain":
        case "moderate rain":
        case "heavy intensity rain":
        case "very heavy rain":
        case "extreme rain":
          return "showers";
  
        case "thunderstorm":
        case "thunderstorm with light rain":
        case "thunderstorm with rain":
        case "thunderstorm with heavy rain":
        case "light thunderstorm":
        case "heavy thunderstorm":
        case "ragged thunderstorm":
        case "thunderstorm with light drizzle":
        case "thunderstorm with drizzle":
        case "thunderstorm with heavy drizzle":
          return "thunder";
  
        case "snow":
        case "freezing rain":
        case "light snow":
        case "Heavy snow":
        case "Sleet":
        case "Light shower sleet":
        case "Shower sleet":
        case "Light rain and snow":
        case "Rain and snow":
        case "Light shower snow":
        case "Shower snow":
        case "Heavy shower snow":
          return "snow";
  
        case "mist":
        case "Smoke":
        case "Haze":
        case "sand/ dust whirls":
        case "fog":
        case "sand":
        case "dust":
        case "volcanic ash":
        case "squalls":
        case "tornado":
          return "mist";
  
        default:
          return "N/A";
      }
  };
  render() {
    return (
      <div>
        <CurrentWeather currentWeather={this.state.currentForecastState}/>
        <div className = "metric-selector">
          <label> Metric </label>
          <input type = "radio" name = "unit-type" value = "metric" checked = {this.state.unit === 'metric'} onChange = {e => this.setState({unit : e.target.value})}></input>
          <label> Imperial </label>
          <input type = "radio" name = "unit-type" value = "imperial" checked = {this.state.unit === 'imperial'} onChange = {e => this.setState({unit : e.target.value})}></input>
        </div>
    </div>
    );
  }
}

export default CurrentWeatherContainer;
