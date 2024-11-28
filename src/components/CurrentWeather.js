import React from "react";

const CurrentWeather = ({ location, temperature, description, icon }) => {
  return (
    <div className="current-weather">
      <h1>{location}</h1>
      <h2>{temperature}</h2>
      <img src={icon} alt="Weather Icon" />
      <p>{description}</p>
    </div>
  );
};

export default CurrentWeather;
