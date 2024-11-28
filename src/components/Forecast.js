import React from "react";

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast-weather">
      <h3>7-Day Forecast</h3>
      <div className="forecast-container">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-day">
            <h4>{day.name}</h4>
            <img src={day.icon} alt={day.shortForecast} />
            <p>
              {day.temperature} °{day.temperatureUnit}
            </p>
            <p>{day.shortForecast}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
