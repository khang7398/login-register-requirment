import React, { useEffect, useState } from "react";
import { useStore } from "./Store";

export default function App() {
  const fetch = useStore((state) => state.fetch);
  const finish = useStore((state) => state.finish);

  const [location, setLocation] = useState("");

  const searchLocation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&unit=imperial&appid=04bc474f4f764aa1760fd2fdfb073c04`
      );
      setLocation("");
    }
  };

  const handlOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={handlOnChange}
          placeholder="Enter Location"
          type="text"
          onKeyDown={searchLocation}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{finish.name}</p>
          </div>
          <div className="temp">
            <h1>{finish.main.temp}°F</h1>
          </div>
          <div className="description">
            {finish.weather ? <p>{finish.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {finish.main ? (
              <p className="bold">{finish.main.feels_like}°F</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {finish.main ? (
              <p className="bold">{finish.main.humidity}%</p>
            ) : null}
            <p>Huminity</p>
          </div>
          <div className="wind">
            {finish.wind ? (
              <p className="bold">{finish.wind.speed} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
