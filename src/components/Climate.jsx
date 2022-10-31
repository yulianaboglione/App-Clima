import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Climate = () => {
  const [weather, setWeather] = useState({});
  const [isCelcius, setIsCelcius] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const succes = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32e50f6e372595ce292e5ef56ebf1d75`
        )
        .then((res) => setWeather(res.data));
    };
    navigator.geolocation.getCurrentPosition(succes);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  console.log(weather);

  return loading ? (
    <div className="loader">
      <HashLoader
        className="la"
        color={"#9BAEBC"}
        loading={loading}
        size={400}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="cardd">
      <h1 className="title" style={{ color: "#FF6F91" }}>
        WEATHER APP
      </h1>
      <h3 className="title-two">
        <span style={{ color: "#FF5773" }}>
          {weather.name}, {weather.sys?.country}
        </span>
      </h3>
      <h3 className="title-three" style={{ color: "#FF5773" }}>
        "{weather.weather?.[0].description}"
      </h3>
      <ul className="list">
        <li style={{ color: "#EB4D57" }}>
          <i className="fa-solid fa-wind" style={{ color: "#FF6F91" }}></i> Wind
          speed:{" "}
          <span style={{ color: "black" }}>{weather.wind?.speed} m/s</span>
        </li>
        <li style={{ color: "#EB4D57" }}>
          <i className="fa-solid fa-cloud" style={{ color: "#FF6F91" }}></i>{" "}
          Clouds: <span style={{ color: "black" }}>{weather.clouds?.all}%</span>
        </li>
        <li style={{ color: "#EB4D57" }}>
          <i
            className="fa-solid fa-temperature-three-quarters"
            style={{ color: "#FF6F91" }}
          ></i>{" "}
          Pressure:{" "}
          <span style={{ color: "black" }}>{weather.main?.pressure} mb</span>
        </li>
      </ul>
      <img
        className="icon"
        src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`}
        alt=""
      />
      <p className="temperature" style={{ color: "#FF6F91" }}>
        {" "}
        {isCelcius
          ? (weather.main?.temp - 273.15).toFixed(2)
          : ((weather.main?.temp - 273.15) * 1.8 + 32).toFixed(2)}{" "}
        {isCelcius ? "°C" : "°F"}
      </p>
      <button className="btn" onClick={() => setIsCelcius(!isCelcius)}>
        {isCelcius ? "Change to °F" : "Change to °C"}
      </button>
    </div>
  );
};

export default Climate;
