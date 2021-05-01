import './App.css';
import React from "react";
import UpcomingWeatherCardContainer from "./components/upcoming/UpcomingWeatherCardContainer";
import CurrentWeatherContainer from "./components/current/currentWeatherContainer";
import Header from "./components/header/Header"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "London",
      unit : "metric",
      locationCountry: "United Kingdom",
      locationDate: 0
    };
  }

  componentDidMount = () => {
    this.getLocalDate(this.state.location);
  };

  getLocalDate = (newLocation) => {
    let offsetHours;
    let updatedCountry;
    switch (newLocation) {
      case "London":
        offsetHours = 0;
        updatedCountry = "United Kingdom";
        break;
      case "Sydney":
        offsetHours = +9;
        updatedCountry = "Australia";
        break;
      case "Moscow":
        offsetHours = +2;
        updatedCountry = "New Russia";
        break;
      case "Rome":
        offsetHours = +1;
        updatedCountry = "Italy";
        break;
      case "Madrid":
        offsetHours = +1;
        updatedCountry = "Spain";
        break;
      default:
        offsetHours = 0;
        updatedCountry = this.state.locationCountry;
    }
    this.setState({
      locationDate: new Date(
        new Date() + offsetHours * 3600 * 1000
      ).toDateString(),
      locationCountry: updatedCountry
    });
  };

  updateLocationClick = (newLocation,unit) => {
    if (newLocation !== "") {
      this.setState({
        location: newLocation,
        unit : unit
      });
      this.getLocalDate(newLocation);
    }
  };
  render() {
    return (
      <div className="App">
        <Header updateLocationClick={this.updateLocationClick} />
        <div className="weather-widget">
          <div className="widget-header">
            <h2>{this.state.location}</h2>
            <p className="location">
              {this.state.locationDate} | {this.state.location},{" "}
              {this.state.locationCountry}
            </p>
          </div>
          <div className="current-weather">
            <CurrentWeatherContainer location={this.state.location} unit = {this.state.unit}/>
          </div>
          <div className="upcoming-weather-cards">
            <UpcomingWeatherCardContainer location={this.state.location} unit = {this.state.unit}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App
