import React from "react";
import {WiFog} from 'react-icons/wi';
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentLocation: ""
    }
  }

  handleChange = () => {
    let newLocation = document.getElementById('searchInput').value;
    if(newLocation !== ""){
      this.setState({ 
        currentLocation: newLocation
      });
    }
    return
  }  
  render() {
    return (
      <header>
        <h1><WiFog size = "80px"></WiFog></h1>
        <input 
          placeholder="Select a new location" 
          aria-label="Enter a new town for an updated forcast" 
          list="locations"
          className="search-input"
          id="searchInput"
          onChange={this.handleChange}
        />
        <datalist id="locations">
          <option value="London" />
          <option value="Sydney" />
          <option value="Moscow" />
          <option value="Rome" />
          <option value="Madrid" />
        </datalist>
        <div className = "weather-input">
        <button className="search" type="button"
          onClick={this.props.updateLocationClick.bind(this, this.state.currentLocation)}>Submit
        </button>
        </div>
      </header>
    );
  }
};

export default Header;