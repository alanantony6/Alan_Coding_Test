import React from "react";
import {WiDaySunny,WiCloud,WiRainMix,WiThunderstorm,WiSnow,WiSmog} from 'weather-icons-react';
import './CurrentWeatherStyle.css';

export class CurrentWeather extends React.Component {
  getCurrentWeatherIcon = (icon) => {
    switch(icon){
        case 'sun' :
          return <WiDaySunny className = "current-main-icon" size = {150}  color = '#000'></WiDaySunny>
        case 'cloud' :
          return <WiCloud className = "current-main-icon" size = {150} color = '#000'></WiCloud>
        case 'showers' :
          return <WiRainMix className = "current-main-icon" size = {150} color = '#000'></WiRainMix>
        case 'thunder' : 
          return <WiThunderstorm className = "current-main-icon" size = {150} color = '#000'></WiThunderstorm>
        case 'snowy' : 
          return <WiSnow className = "current-main-icon" size = {150} color = '#000'></WiSnow>
        case 'mist':
          return <WiSmog className = "current-main-icon" size = {150} color = '#000'></WiSmog>
        default : 
          return <p>Something Went Wrong </p>
      }
  }
  render() {
    return (
      <div className = "weather-info">
        <p className="todays-forecast">
          Today's forcast is {this.props.currentWeather.weatherType}
        </p>
        <div className="temps">
          <p className="high-temp">
            High: {Math.floor(this.props.currentWeather.maxTemp)}°
          </p>
          <p className="low-temp">
            Low: {Math.floor(this.props.currentWeather.minTemp)}°
          </p>
          </div>
          <div className = "other-weather-details">
            <p>Humidity : {this.props.currentWeather.humidity}</p>
            <p>Pressure : {this.props.currentWeather.pressure}</p>
          </div>
          {this.getCurrentWeatherIcon(this.props.currentWeather.weatherIcon)}
      </div>
    );
  }
}
