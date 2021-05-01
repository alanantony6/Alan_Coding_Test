import React from "react";
import {WeatherIcons} from "./WeatherIcons";

class WeatherIconsContainer extends React.Component {
  getWeatherIcon = (weatherIcon) => {
    switch(weatherIcon){
      case 'clear sky':
      return ['sun']

      case 'scattered clouds':
      case 'few clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return ['cloud']

      case 'shower rain':
      case 'light intensity drizzle':
      case 'drizzle':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
      case 'light rain':
      case 'rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
          return ['showers']

      case 'thunderstorm':
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain':
      case 'light thunderstorm':
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
        return ['thunder'] 
        
      case 'snow':
      case 'freezing rain':
      case 'light snow':
      case 'Heavy snow':
      case 'Sleet':
      case 'Light shower sleet':
      case 'Shower sleet':
      case 'Light rain and snow':
      case 'Rain and snow':
      case 'Light shower snow':
      case 'Shower snow':
      case 'Heavy shower snow':
        return ['snowy']

      case 'mist':
      case 'Smoke':
      case 'Haze':
      case 'sand/ dust whirls':
      case 'fog':
      case 'sand':
      case 'dust':
      case 'volcanic ash':
      case 'squalls':
      case 'tornado':
        return ['mist']

      default:
        return ['help']
    }
  }
  render(){
    return (
      <div className="weather-icon">
        <WeatherIcons weatherIcon={this.getWeatherIcon(this.props.weatherType)} />
      </div>
    );
  };
}

export default WeatherIconsContainer;
