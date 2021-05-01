import React from "react";
import WeatherIconsContainer from "../icons/WeatherIconsContainer"

export const UpcomingWeatherCard = props => {
  return props.fiveDayForecast.map((forecast, i) => {
    return (
      <div className="upcoming-weather-card" key={i}>
        <p className="day-of-week">{forecast.dayOfWeek}</p>
        <WeatherIconsContainer
          weatherType={forecast.weatherType} />
        <div className="temps">
          <p className="high-temp">{Math.round(forecast.maxTemp)}°</p>
          <p className="low-temp">{Math.round(forecast.minTemp)}°</p>
        </div>
      </div>
      );
    });
  };