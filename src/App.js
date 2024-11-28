import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./index.css";

const App = () => {
  const [location, setLocation] = useState("Loading...");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.weather.gov/points/${latitude},${longitude}`,
        );
        if (!response.ok) throw new Error("Could not fetch weather data");

        const data = await response.json();
        const forecastUrl = data.properties.forecast;
        const locationName = data.properties.relativeLocation.properties.city;

        // Fetch actual forecast data
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok)
          throw new Error("Could not fetch forecast data");

        const forecastData = await forecastResponse.json();
        const currentWeather = forecastData.properties.periods[0];
        const forecastPeriods = forecastData.properties.periods.slice(1, 8);

        // Update state
        setLocation(locationName);
        setTemperature(
          `${currentWeather.temperature} °${currentWeather.temperatureUnit}`,
        );
        setDescription(currentWeather.shortForecast);
        setIcon(getWeatherIcon(currentWeather.shortForecast));
        setForecastData(
          forecastPeriods.map((period) => ({
            name: period.name,
            icon: getWeatherIcon(period.shortForecast),
            temperature: period.temperature,
            temperatureUnit: period.temperatureUnit,
            shortForecast: period.shortForecast,
          })),
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLocation("Unable to retrieve data");
      }
    });
  }, []);

  const getWeatherIcon = (description) => {
    if (description.toLowerCase().includes('cloud')) {
      return 'http://openweathermap.org/img/wn/04d@2x.png'; // Cloudy icon
    } else if (description.toLowerCase().includes('rain')) {
      return 'http://openweathermap.org/img/wn/09d@2x.png'; // Rainy icon
    } else if (description.toLowerCase().includes('sun')) {
      return 'http://openweathermap.org/img/wn/01d@2x.png'; // Sunny icon
    } else {
      return 'http://openweathermap.org/img/wn/50d@2x.png'; // Unknown/mist icon
    }
  };

  return (
    <div className="weather-container">
      <CurrentWeather
        location={location}
        temperature={temperature}
        description={description}
        icon={icon}
      />
      <Forecast forecastData={forecastData} />
    </div>
  );
};

export default App;
