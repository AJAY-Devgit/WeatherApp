import { useEffect, useState } from "react";
import "./App.css";

import SearchIcon from "./assets/search.png";
import ClearSkyD from "./assets/cleard.png";
import ClearSkyN from "./assets/clearn.png";
import FewCloudsD from "./assets/fewCloudsd.png";
import FewCloudsN from "./assets/fewCloudsn.png";
import BrokenClouds from "./assets/brokenClouds.png";
import ShoweRain from "./assets/showerRain.png";
import RainD from "./assets/raind.png";
import RainN from "./assets/rainn.png";
import Mist from "./assets/mist.png";
import Snow from "./assets/snow.png";
import ScatteredClouds from "./assets/scatteredClouds.png";
import ThunderStrom from "./assets/thunderstorm.png";

import Humidity from "./assets/humidity.png";
import WindSpeed from "./assets/windSpeed.png";

function App() {
  const weatherMap = {
    "01d": ClearSkyD,
    "01n": ClearSkyN,
    "02d": FewCloudsD,
    "02n": FewCloudsN,
    "03d": ScatteredClouds,
    "03n": ScatteredClouds,
    "04d": BrokenClouds,
    "04n": BrokenClouds,
    "09d": ShoweRain,
    "09n": ShoweRain,
    "10d": RainD,
    "10n": RainN,
    "11d": ThunderStrom,
    "11n": ThunderStrom,
    "13d": Snow,
    "13n": Snow,
    "50d": Mist,
    "50n": Mist,
  };

  const [input, setInput] = useState("Madurai");
  const [icon, setIcon] = useState("02d");
  const [cel, setCel] = useState(0);
  const [cityText, setCityText] = useState(input);

  const [country, setCountry] = useState("In");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  function SearchHandle(event) {
    setInput(event.target.value);
  }

  async function SearchCity() {
    if(input.trim().length===0){
      return alert("Please enter the city")
    }
    setLoading(true);
    let id = "8315404a32198e90ff76b3cd4089c074";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.trim()}&appid=${id}&units=Metric`;

    try {

      const fetchData = await fetch(url);
      const data = await fetchData.json();
      if (data.cod == 404) {
        setCityNotFound(true);
        setLoading(false);
       return;
      }

      setLoading(false);
      setCityNotFound(false);
      setCityText(data.name);
      setIcon(data.weather[0].icon);
      setCel(data.main.temp);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    SearchCity();
  },[]);

  return (
    <>
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            id="search"
            placeholder="Search city"
            autoComplete="off"
            value={input}
            onChange={SearchHandle}
            onKeyDown={(e) => e.key == "Enter" ? SearchCity() : ""}
          />
          <img
            src={SearchIcon}
            alt="search"
            className="search-icon"
            width={20}
            onClick={SearchCity}
          />
        </div>

        {loading && !cityNotFound && <div className="loading">Loading...</div>}
        {cityNotFound && <div className="city-not-found">City Not Found</div>}

        {!cityNotFound && !loading && (
          <div className="weather-det">
            <div className="status-img">
              <img src={weatherMap[icon]} alt="icon" width={120} />
            </div>

            <p className="cel">{cel}°</p>
            <h3 className="city-text">{cityText}</h3>
            <p className="country-text">{country}</p>

            <div className="coord">
              <div className="lat">
                <span>Lattitude</span>
                <span>{lat}</span>
              </div>
              <div className="lon">
                <span>Longtitude</span>
                <span>{lon}</span>
              </div>
            </div>

            <div className="other">
              <div className="humidity">
                <img src={Humidity} alt="icon" width={60} />
                <span>{humidity}%</span>
                <span>Humidity</span>
              </div>
              <div className="wind-speed">
                <img src={WindSpeed} alt="icon" width={60} />
                <span>{windSpeed} km/h</span>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        )}
        {/* <p className="copy-right">Desingne d by Ajay Kumar</p> */}
      </div>
    </>
  );
}

export default App;
