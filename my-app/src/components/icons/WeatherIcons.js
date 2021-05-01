import React from "react";
import {WiCloud, WiDaySunny, WiSnow, WiRainMix, WiThunderstorm, WiSmog } from 'weather-icons-react';

export const WeatherIcons = props => {
  return props.weatherIcon.map((icon) => {
    switch(icon){
      case 'sun' :
        return <WiDaySunny size = {70} color = '#000'></WiDaySunny>
      case 'cloud' :
        return <WiCloud size = {70} color = '#000'></WiCloud>
      case 'showers' :
        return <WiRainMix size = {70} color = '#000'></WiRainMix>
      case 'thunder' : 
        return <WiThunderstorm size = {70} color = '#000'></WiThunderstorm>
      case 'snowy' : 
        return <WiSnow size = {70} color = '#000'></WiSnow>
      case 'mist':
        return <WiSmog size = {70} color = '#000'></WiSmog>
    }
  });
};