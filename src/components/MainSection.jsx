import { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai'

import '../styles/MainSection.css';


//https://api.unsplash.com/search/photos?tags=urban&query=location[london]&per_page=1&client_id=t3SaVs2Cti4_1ZdeRR6zgPirK5P97fLWcUXd3gRYa1s
function MainSection() {
  const weatherKeyAPI = 'ddb3c04efbbc46ad9d6201356230905';
  const weatherUrlBefore = 'https://api.weatherapi.com/v1/current.json?key=';
  const weatherUrlAfter = '&q=';
  
  
  const photoKeyAPI = 't3SaVs2Cti4_1ZdeRR6zgPirK5P97fLWcUXd3gRYa1s';
  const photoUrlBefore = 'https://api.unsplash.com/search/photos?tags=urban&query=location['
  const photoUrlAfter = ']&per_page=1&client_id='

  const [city, setCity] = useState('london');
  const [weatherData, setWeatherData] = useState(null);
  const [photoData, setPhotoData] = useState(null);



  const getInfo = async (city) => {
    const weatherURL = buildURL(weatherUrlBefore, weatherKeyAPI, weatherUrlAfter, city);
    const unsplashURL = buildURL(photoUrlBefore, city, photoUrlAfter, photoKeyAPI);


    const weatherResponse = await fetch(weatherURL);
    const weatherJSON = await weatherResponse.json();

    const unsplashResponse = await fetch(unsplashURL);
    const unsplashJSON = await unsplashResponse.json();
    

    setWeatherData(weatherJSON);
    setPhotoData(unsplashJSON);
  }

  const buildURL = (...args) => args.reduce((sum, current) => sum + current);

  useEffect(() => { getInfo('london') }, []);

  return (
    <main>
      <div className="main-content">
        <div className="city-photo"
        style={{
          backgroundImage: `url(${photoData?.results[0].urls.full})`
        }}></div>
        <div className="info">
          <div className="search">
            <AiOutlineSearch color="#666" size={24}/>
            <input type="text" placeholder="Search city"/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainSection;