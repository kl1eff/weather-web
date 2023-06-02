import { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai'

import '../styles/MainSection.css';


function MainSection() {
  const weatherKeyAPI = 'ddb3c04efbbc46ad9d6201356230905';
  const weatherUrlBefore = 'https://api.weatherapi.com/v1/current.json?key=';
  const weatherUrlAfter = '&q=';
  
  
  const photoKeyAPI = 't3SaVs2Cti4_1ZdeRR6zgPirK5P97fLWcUXd3gRYa1s';
  const photoUrlBefore = 'https://api.unsplash.com/search/photos?tags=urban&query=location[';
  const photoUrlAfter = ']&per_page=1&client_id=';

  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [photoData, setPhotoData] = useState(null);


  const weatherOptions = [
    weatherData?.current.condition.text ?? null,
    weatherData?.current.temp_c ?? null,
    weatherData?.location.region ?? null,
    weatherData?.current.vis_km ?? null,
    weatherData?.current.feelslike_c ?? null,
    weatherData?.current.pressure_mb ?? null,
    weatherData?.current.humidity ?? null,
    weatherData?.current.wind_kph ?? null
  ]

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
    console.log('DATA HAS LOADED      ')
  }
  
  const searchChangeHandler = (e) => setCity(e.target.value);

  const checkEnterHandler = (e) => e.key === 'Enter' && loadInfo(city);

  const buildURL = (...args) => args.reduce((sum, current) => sum + current);     console.log(weatherData);
  

  return (
    <main>
      <div className="main-content">
        <div className="main-left"
        style={{
          backgroundImage: `url(${photoData?.results[0].urls.full})`
        }}></div>
        <div className="main-right">
          <div className="search">
            <AiOutlineSearch color="#666" size={24}/>
            <input
            type="text"
            placeholder="Search city" 
            onChange={searchChangeHandler}
            onKeyUp={checkEnterHandler}
            />
          </div>
          <div className="weather-info">
            <div className="city-name">{weatherData?.location?.name}</div>
            <div className="weather-card">
              <div className="card-left"></div>
              <div className="card-right">
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
                    <span className="weather-option">Wind:</span>
                    {weatherOptions[7]}kph
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainSection;