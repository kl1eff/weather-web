import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../styles/MainSection.css';

function MainSection() {
  console.log(import.meta.env.VITE_UNSPLASH_KEY);

  const weatherKeyAPI = import.meta.env.VITE_WEATHER_KEY;
  const weatherUrlBefore = 'https://api.weatherapi.com/v1/current.json?key=';
  const weatherUrlAfter = '&q=';

  const photoKeyAPI = import.meta.env.VITE_UNSPLASH_KEY;
  const photoUrlBefore = 'https://api.unsplash.com/search/photos?tags=urban&query=location[';
  const photoUrlAfter = ']&per_page=1&client_id=';

  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [photoData, setPhotoData] = useState(null);

  let weatherOptions = [];

  if (weatherData) {
    const current = weatherData.current;

    weatherOptions = [
      current.condition.text,
      current.temp_c,
      weatherData.location.region,
      current.vis_km,
      current.feelslike_c,
      current.pressure_mb,
      current.humidity,
      current.gust_kph,
    ];
  }

  useEffect(() => void loadInfo('london'), []);

  const loadInfo = async () => {
    const weatherURL = buildURL(weatherUrlBefore, weatherKeyAPI, weatherUrlAfter, city);
    const unsplashURL = buildURL(photoUrlBefore, city, photoUrlAfter, photoKeyAPI);

    const weatherResponse = await fetch(weatherURL);
    const weatherJSON = await weatherResponse.json();

    const unsplashResponse = await fetch(unsplashURL);
    const unsplashJSON = await unsplashResponse.json();

    setWeatherData(weatherJSON);
    setPhotoData(unsplashJSON);
  };

  const searchChangeHandler = (e) => setCity(e.target.value);

  const checkEnterHandler = (e) => e.key === 'Enter' && loadInfo(city);

  const buildURL = (...args) => args.reduce((sum, current) => sum + current);
  console.log(weatherData);

  return (
    <main>
      <div className="main-content">
        <img
          className="main-left"
          src={photoData?.results[0].urls.full}
        />

        <div className="main-right">
          <div className="search">
            <AiOutlineSearch fill="#666" size={24} />

            <input type="text" placeholder="Search city" onChange={searchChangeHandler} onKeyUp={checkEnterHandler} />
          </div>

          <div className="weather-info">
            <div className="city-name">{weatherData?.location?.name}</div>
            <div className="weather-card">
              <div className="card-left">
                <ul>
                  <li className="weather-mini-block">
                    <span className="weather-option">Weather:</span>
                    {weatherOptions[0]}
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Temperature:</span>
                    {weatherOptions[1]}
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Description:</span>
                    {weatherOptions[2]}
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Visibility:</span>
                    {weatherOptions[3]}km
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Feels like:</span>
                    {weatherOptions[4]}c
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Pressure:</span>
                    {weatherOptions[5]}mb
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Humidity:</span>
                    {weatherOptions[6]}
                  </li>
                  <li className="weather-mini-block">
                    <span className="weather-option">Gust speed:</span>
                    {weatherOptions[7]}kph
                  </li>
                </ul>
              </div>

              <div className="card-right">
                <div className="weather-icon flex-justify-content" style={{ width: '100%' }}>
                  <img
                    src={weatherData?.current.condition.icon}
                    alt=""
                    style={{
                      width: '64px',
                      height: '64px',
                    }}
                  />
                </div>

                <div className="right-options">
                  <div className="code flex-justify-content">
                    <div className="weather-option">Code: {weatherData?.current.condition.code}</div>
                  </div>

                  <div className="cords flex-justify-content flex-column">
                    <div className="weather-option flex-justify-content">Coordinates</div>

                    <div className="right-vals-sub flex-align">
                      <div>
                        longtitude: <span>{weatherData?.location.lon}</span>
                      </div>
                      <div>
                        latitude: <span>{weatherData?.location.lat}</span>
                      </div>
                    </div>
                  </div>

                  <div className="wind flex-justify-content flex-column">
                    <div className="weather-option flex-justify-content">Wind</div>
                    <div className="right-vals-sub">
                      <div>
                        speed:
                        <span>{weatherData?.current.wind_kph}</span>
                      </div>
                      <div>
                        deg:
                        <span>{weatherData?.current.wind_degree}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainSection;
